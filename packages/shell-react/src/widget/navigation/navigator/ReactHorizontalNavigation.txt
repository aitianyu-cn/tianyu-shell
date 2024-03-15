/**@format */

import React from "react";
import { FeatureToggle, isIOS, Theme } from "@aitianyu.cn/tianyu-shell/core";
import { ReactNode } from "react";
import { RouterHelper } from "ty-infra/core/RouterHelper";
import { IReactNavigationProps } from "ty-infra/ui/model/Navigation";
import { ReactHorizontalNavigationItem } from "./ReactHorizontalNavigationItem";
import { ReactNavigation } from "./ReactNavigation";
import { ReactNavigationItem } from "./ReactNavigationItem";
import * as MessageBundle from "ty-infra/ui/i18n/MessageBundle";
import { ReactHorizontalNavigationNarrowContext } from "./ReactHorizontalNavigationNarrowContext";

import REACT_NAVIGATION_MENU_ICON from "ty-infra/ui/res/menu.svg";

import "../../css/horizontal-navigation.css";

export class ReactHorizontalNavigation extends ReactNavigation {
    private fontsizeMap: Record<number, number>;
    private fontSize: number;

    private isMenuOpened: boolean;
    private isMenuFocus: boolean;
    private isIconFocus: boolean;
    private menuCloseTimer: number;

    public constructor(props: IReactNavigationProps) {
        super(props);

        this.fontsizeMap = props.fontMap;
        this.fontSize = this.calculateFontsizeFromWidth(this.isMobileMode ? window.outerWidth : window.innerWidth);
        this.setSource(props.source);

        this.isMenuOpened = false;
        this.isMenuFocus = false;
        this.isIconFocus = false;
        this.menuCloseTimer = -1;
    }

    /**
     *
     * @param map
     */
    public setWidthToFontSizeMap(map: Record<number, number>): void {
        if (Object.keys(map).length <= 0) {
            return;
        }

        this.fontsizeMap = map;
    }

    // ##########################################################################
    // basic override
    // ##########################################################################

    protected override isNarrow(): boolean {
        const pageWidth = this.isMobileMode ? window.outerWidth : window.innerWidth;
        const canvas = document.createElement("canvas");
        const canvasContext: CanvasRenderingContext2D | undefined = canvas?.getContext("2d") || undefined;
        if (canvasContext) {
            canvasContext.font = `${this.fontSize}px "Segoe UI"`;
        }

        let memberWidth = 0;
        for (const item of Object.keys(this.items)) {
            const itemObj = this.items[item];
            if (itemObj.getAssist()) {
                memberWidth += 60;
            } else {
                memberWidth += itemObj.calculateWidth(canvasContext);
            }
        }

        // add title part
        memberWidth += canvasContext?.measureText(this.title).width || 0;
        // to multiple 110% to ensure the enough buffer area
        memberWidth = memberWidth * 1.2;

        return memberWidth > pageWidth;
    }

    protected override isSizeChanged(): boolean {
        // when in mobile mode, should not response size changed
        if (this.isMobileMode) {
            return false;
        }

        const newPageWidth = this.isMobileMode ? window.outerWidth : window.innerWidth;
        const isWidthChanged = newPageWidth !== this.currentPageWidth;

        const beforeInNarrow = this.inNarrowMode;
        this.inNarrowMode = this.isNarrow();

        if (beforeInNarrow !== this.inNarrowMode) {
            // layout is changed
            return true;
        }

        // layout is not changed

        if (!this.inNarrowMode) {
            // in normal mode
            // to return width changed to get the font size change
            return isWidthChanged;
        }

        if (this.inNarrowMode) {
            // in narrow mode
            // to return the height change or width change to update the context
            const newPageHeight = window.outerHeight;
            return isWidthChanged || newPageHeight !== this.currentPagHeight;
        }

        return false;
    }

    protected override onResize(): void {
        const newWidth = this.isMobileMode ? window.outerWidth : window.innerWidth;
        // store the old size ans calculate the new size
        const oldFontsize = this.fontSize;
        this.fontSize = this.calculateFontsizeFromWidth(newWidth);
        const isFontSizeChanged = oldFontsize !== this.fontSize;

        if (isFontSizeChanged) {
            for (const item of Object.keys(this.items)) {
                const itemObj = this.items[item];

                // only when the font size is changed, to update font size
                itemObj.updateFontSize(this.fontSize);
            }
        }
    }

    protected override updateItems(): void {
        const source = this.itemSource;
        const newWidth = this.isMobileMode ? window.outerWidth : window.innerWidth;
        this.fontSize = this.calculateFontsizeFromWidth(newWidth);

        for (const sourceKey of Object.keys(source)) {
            const sourceItem = source[sourceKey];
            const itemId = RouterHelper.formatUrl(sourceKey.startsWith("/") ? sourceKey.substring(1) : sourceKey);

            const itemInstance = new ReactHorizontalNavigationItem({
                id: itemId,
                key: sourceItem.key,
                icon: sourceItem.icon,
                fontSize: this.fontSize,
                assist: sourceItem.assist,
                iconType: sourceItem.iconType,
                url: sourceItem.url || "",
            });
            this.items[sourceKey] = itemInstance;
        }
    }

    protected override beforeHashChangedRender(): void {
        // when in mobile mode and the toggle REACT_HORIZONTAL_NAVIGATION_MOB_AUTO_CLOSE is turn on
        if (this.isMobileMode && FeatureToggle.isActive("REACT_HORIZONTAL_NAVIGATION_MOB_AUTO_CLOSE")) {
            // to close menu bar directly
            this.isMenuOpened = false;
        }
    }

    // ##########################################################################
    // navigation render part
    // ##########################################################################

    protected override renderForMobile(): ReactNode {
        const normalItems: ReactNavigationItem[] = [];
        const assistItems: ReactNavigationItem[] = [];
        if (this.isMenuOpened) {
            this.navigationItemsClassification({ normalItems: normalItems, assistItems: assistItems });
        }

        const iosMode = isIOS || true;

        let iosMenuAlt: string = "";
        let iosMenuIcon: string = "";
        if (iosMode) {
            const customTheme = Theme.getCustome();
            const defaultTheme = Theme.getDefault();
            const themeColor = customTheme?.color || defaultTheme?.color || "dark";
            iosMenuIcon =
                themeColor === "dark" ? require("../../res/menu_dark.png").default : require("../../res/menu_light.png").default;

            iosMenuAlt = MessageBundle.getText("REACT_NAVIGATION_MENU_ICON_IOS_ALT");
        }

        return (
            <div id={this.id} className="r_hn_b r_hn_b_m">
                <div className="r_hn_c_m">
                    <div
                        className={`r_hn_n_na_s_c_m ${this.isMenuOpened ? "r_hn_n_na_s_c_s_m" : ""}`}
                        onClick={this.onMenuIconClick.bind(this)}
                        // add mouse leave event if the menu is opend
                        onMouseLeave={this.isMenuOpened ? this.onMenuIconMoveOut.bind(this) : () => {}}
                        onMouseEnter={this.isMenuOpened ? this.onMenuIconMoveIn.bind(this) : () => {}}>
                        {!iosMode ? (
                            <div className="r_hn_n_na_s" dangerouslySetInnerHTML={{ __html: REACT_NAVIGATION_MENU_ICON }} />
                        ) : (
                            <img className="r_hn_n_na_s" src={iosMenuIcon} alt={iosMenuAlt} />
                        )}
                    </div>
                    {this.renderSelectedItemsForMobile()}
                    {this.isMenuOpened && (
                        <ReactHorizontalNavigationNarrowContext
                            normalItems={normalItems}
                            assistItems={assistItems}
                            fontMap={this.fontsizeMap}
                            fnMouseMoveOut={this.afterMenuContextMoveOut.bind(this)}
                            fnMouseMoveIn={this.afterMenuContextMoveIn.bind(this)}
                        />
                    )}
                </div>
            </div>
        );
    }
    private renderSelectedItemsForMobile(): ReactNode {
        const selectedItem = this.getSelectedItem();

        // if there is no selected item
        // show default string
        return (
            !!selectedItem && (
                <div className="r_hn_n_na_i_c_m">
                    <div className="r_hn_n_na_i_t_m" style={{ fontSize: `${this.fontSize}px` }}>
                        {selectedItem.getKey()}
                    </div>
                </div>
            )
        );
    }

    // render for not mobile part

    private renderTitle(): ReactNode {
        return <div className="r_hn_t">{this.title}</div>;
    }

    // // render for normal part
    protected override renderForNormal(): ReactNode {
        const normalItems: ReactNavigationItem[] = [];
        const assistItems: ReactNavigationItem[] = [];
        this.navigationItemsClassification({ normalItems: normalItems, assistItems: assistItems });

        return (
            <div id={this.id} className="r_hn_b r_hn_b_p">
                <div className="r_hn_c">
                    {this.title && this.renderTitle()}
                    <div className="r_hn_n_n">{this.renderNormalItemsForNormalMode(normalItems)}</div>
                    <div className="r_hn_as r_hn_as_n">{this.renderAssistItemsForNormalMode(assistItems)}</div>
                </div>
            </div>
        );
    }

    private renderNormalItemsForNormalMode(normalItems: ReactNavigationItem[]): ReactNode {
        const renderedItems: ReactNode[] = [];

        for (const item of normalItems) {
            renderedItems.push(item.renderForNormal());
        }

        return <div className="r_hn_n_in_n">{renderedItems}</div>;
    }
    private renderAssistItemsForNormalMode(assistItems: ReactNavigationItem[]): ReactNode {
        const renderedItems: ReactNode[] = [];

        for (const item of assistItems) {
            renderedItems.push(item.renderForNormal());
        }

        return <div className="r_hn_as_in_n">{renderedItems}</div>;
    }

    // // render for narrow part
    protected override renderForNarrow(): ReactNode {
        const normalItems: ReactNavigationItem[] = [];
        const assistItems: ReactNavigationItem[] = [];
        if (this.isMenuOpened) {
            this.navigationItemsClassification({ normalItems: normalItems, assistItems: assistItems });
        }

        return (
            <div id={this.id} className="r_hn_b r_hn_b_p">
                <div className="r_hn_c">
                    {this.title && this.renderTitle()}
                    <div className="r_hn_as r_hn_as_na">
                        <div className="r_hn_as_in_n">
                            <div className="r_hn_n_na">{this.renderSelectedItemsForNarrowMode()}</div>
                            <div
                                className={`r_hn_n_na_s_c ${this.isMenuOpened ? "r_hn_n_na_s_c_s" : "r_hn_n_na_s_c_us"}`}
                                onClick={this.onMenuIconClick.bind(this)}
                                // add mouse leave event if the menu is opend
                                onMouseLeave={this.isMenuOpened ? this.onMenuIconMoveOut.bind(this) : () => {}}
                                // onMouseEnter={this.isMenuOpened ? this.onMenuIconMoveIn.bind(this) : () => {}}>
                                onMouseEnter={this.onMenuIconMoveIn.bind(this)}>
                                <div
                                    className="r_hn_n_na_s"
                                    dangerouslySetInnerHTML={{ __html: REACT_NAVIGATION_MENU_ICON }}></div>
                            </div>
                        </div>
                    </div>
                    {/** to render the menu context if the menu should be opend */}
                    {this.isMenuOpened && (
                        <ReactHorizontalNavigationNarrowContext
                            normalItems={normalItems}
                            assistItems={assistItems}
                            fontMap={this.fontsizeMap}
                            fnMouseMoveOut={this.afterMenuContextMoveOut.bind(this)}
                            fnMouseMoveIn={this.afterMenuContextMoveIn.bind(this)}
                        />
                    )}
                </div>
            </div>
        );
    }

    private renderSelectedItemsForNarrowMode(): ReactNode {
        const selectedItem = this.getSelectedItem();

        // if there is no selected item
        // show default string
        return (
            !!selectedItem && (
                <div className="r_hn_n_na_b">
                    {selectedItem.getIconType() === "url" ? (
                        <img className="r_hn_i_d_i" src={selectedItem.getIcon()} alt={selectedItem.getKey()} />
                    ) : (
                        <div className="r_hn_i_d_i" dangerouslySetInnerHTML={{ __html: selectedItem.getIcon() }}></div>
                    )}
                    <div className="r_hn_n_na_i_t">{selectedItem.getKey()}</div>
                </div>
            )
        );
    }
    private onMenuIconClick(): void {
        if (this.isMenuOpened) {
            this.isMenuOpened = false;
        } else {
            this.isMenuOpened = true;
        }

        // always to reset the menu focus state
        this.isMenuFocus = false;
        this.forceUpdate();
    }
    private afterMenuContextMoveOut(): void {
        console.log("menu out");
        this.isMenuFocus = false;

        if (-1 !== this.menuCloseTimer) {
            window.clearTimeout(this.menuCloseTimer);
        }
        this.menuCloseTimer = window.setTimeout(() => {
            if (!this.isMenuFocus && !this.isIconFocus) {
                // wait for 500ms then to check the focus state
                // only when the menu focus and icon focus are all lost
                // to close the menu context
                this.menuCloseTimer = -1;
                this.onMenuIconClick();
            }
        }, 50);
    }
    private afterMenuContextMoveIn(): void {
        console.log("menu in");
        // set the menu focus to be true to keep the context show
        this.isMenuFocus = true;
    }
    private onMenuIconMoveOut(): void {
        console.log("icon out");
        this.isIconFocus = false;

        if (-1 !== this.menuCloseTimer) {
            window.clearTimeout(this.menuCloseTimer);
        }
        this.menuCloseTimer = window.setTimeout(() => {
            if (!this.isMenuFocus && !this.isIconFocus) {
                // wait for 500ms then to check the focus state
                // only when the menu focus and icon focus are all lost
                // to close the menu context
                this.menuCloseTimer = -1;
                this.onMenuIconClick();
            }
        }, 50);
    }
    private onMenuIconMoveIn(): void {
        console.log("icon in");
        // set the icon focus to be true to keep the context show
        this.isIconFocus = true;
        if (!this.isMenuOpened && FeatureToggle.isActive("REACT_HORIZONTAL_NAVIGATION_NARROW_HOVER_OPEN")) {
            this.isMenuOpened = true;
            this.forceUpdate();
        }
    }

    // ##########################################################################
    // prepare data for render
    // ##########################################################################

    private calculateFontsizeFromWidth(width: number): number {
        if (this.isMobileMode) {
            return ReactNavigation.FONT_SIZE_MOBILE_DEFAULT;
        }

        let fontSize: number = 0;
        let relatedWidth: number = width;

        let minFontsizeOfWidth: number = 0;
        let minSetWidth: number = width;
        for (const setWidth of Object.keys(this.fontsizeMap)) {
            const setWidthNum: number = Number.parseInt(setWidth);

            // calculate the actual diff between current width and mapped width.
            const nearWidth = width - setWidthNum;
            // if mapped width is less than actual and the diff is less or equal to the pre-calculated.
            if (nearWidth > 0 && relatedWidth > nearWidth) {
                // to update the font size to the closer one.
                relatedWidth = nearWidth;
                fontSize = this.fontsizeMap[setWidthNum];
            }

            // to cache the minimum mapped width
            if (minSetWidth > setWidthNum) {
                minSetWidth = setWidthNum;
                minFontsizeOfWidth = this.fontsizeMap[setWidthNum];
            }
        }

        // return font size if it is mapped
        // or return the minimum size in the mapped if all the size is greate than mapping
        // or return default size if all of these are not mapped
        return fontSize || minFontsizeOfWidth || ReactNavigation.FONT_SIZE_DEFAULT;
    }

    private navigationItemsClassification(targets: {
        normalItems: ReactNavigationItem[];
        assistItems: ReactNavigationItem[];
    }): void {
        const fnFillArray = (item: ReactNavigationItem, arr: ReactNavigationItem[]) => {
            if (item.getIndex() === -1) {
                arr.push(item);
                return arr;
            } else {
                const newArr: ReactNavigationItem[] = [];
                let i = 0;
                for (; i < arr.length && arr[i].getIndex() !== -1; ++i) {
                    if (arr[i].getIndex() > item.getIndex()) {
                        break;
                    } else {
                        newArr.push(arr[i]);
                    }
                }
                arr.push(item);
                for (; i < arr.length; ++i) {
                    newArr.push(arr[i]);
                }

                return newArr;
            }
        };

        for (const itemKey of Object.keys(this.items)) {
            const item = this.items[itemKey];
            if (item.getAssist()) {
                targets.assistItems = fnFillArray(item, targets.assistItems);
            } else {
                targets.normalItems = fnFillArray(item, targets.normalItems);
            }
        }
    }
}
