/**@format */

import { CallbackAction, CallbackActionT } from "@aitianyu.cn/types";
import { TianyuUIStyleDeclaration } from "shell-core/src/core/declares/ui/TianyuUIStyle";
import { TianyuUI } from "./TianyuUI";
import { ITianyuShellCookieConfigure } from "../Core";
import { IStore, InstanceId } from "@aitianyu.cn/tianyu-store";

/** Tianyu Shell UI Theme Color */
export type TianyuShellUIThemeColor = "light" | "dark";

/** Tianyu Shell UI Toast Message Type */
export enum TianyuShellUIMessageType {
    /** Critical Error */
    FATAL = 0,
    /** Normal Error */
    ERROR = 1,
    /** Warning */
    WARNING = 2,
    /** Information */
    INFO = 3,
    /** Process Success */
    SUCCESS = 4,
    /** Data Reload */
    RELOAD = 5,
}

/** Tianyu Shell UI Dialog Button Type */
export enum TianyuShellUIDialogButtons {
    /** Yes button only */
    YES,
    /** Yes and No button */
    YES_NO,
    /** Yes, No and Cancel Button */
    YES_NO_CANCEL,
    /** OK button only (function is same as Yes button, only the button string is different) */
    OK,
    /** No button provided */
    NONE,
}

/** Tianyu Shell UI Dialog Default Type */
export enum TianyuShellUIDialogType {
    /** Error Dialog */
    ERROR,
    /** Warning Dialog */
    WARNING,
    /** Info Dialog */
    INFO,
    /** Normal Input Dialog */
    INPUT,
    /** Password Input Dialog */
    PASSWORD,
}

/** Tianyu Shell UI Hyper Link */
export interface TianyuShellUIHyperLink {
    /** Hyper Link Key Name */
    key: string;
    /** Hyper Link Additional Description */
    message: string;
    /** Hyper Link Callback function */
    link: CallbackAction;
}

/** Tianyu Shell UI Theme */
export interface ITianyuShellCoreUIThemeItem {
    /** Theme name */
    theme: string;
    /** Theme color */
    color: TianyuShellUIThemeColor;
}

/** Tianyu Shell UI Vertical Alignment */
export enum ITianyuShellUIVerticalAlignment {
    /** Top Alignment */
    TOP,
    /** Bottom Alignment */
    BOTTOM,
    /** Center Alignment */
    CENTER,
}

/** Tianyu Shell UI Horizontal Alignment */
export enum ITianyuShellUIHorizontalAlignment {
    /** Left Alignment */
    LEFT,
    /** Right Alignment */
    RIGHT,
    /** Center Alignment */
    CENTER,
}

/** Tianyu Shell UI Custom Theme APIs */
export interface ITianyuShellCoreUIThemeCustom {
    /**
     * Get current using custom themes
     *
     * @returns all using custom themes
     */
    get(): string[];
    /**
     * Get whether the theme is using currently
     *
     * @param id custom theme id
     *
     * @returns return true if the theme is applied to ui, otherwise false
     */
    contains(id: string): boolean;
    /**
     * Remove using custom theme
     *
     * @param id the using custom theme id
     */
    remove(id: string): void;
    /** Reset custom theme status and remove all using custom theme */
    reset(): void;
}

/** Tianyu Shell UI Theme APIs */
export interface ITianyuShellCoreUITheme {
    /**
     * Application default Theme setting
     * This setting is set during application initialization by initial configuration
     */
    default: ITianyuShellCoreUIThemeItem;
    /**
     * Application custom Theme setting
     * This theme setting is used for Tianyu Shell general themes setting
     * (This theme is defined in Tianyu Shell inner)
     */
    custom: ITianyuShellCoreUIThemeItem | null;
    /**
     * Application Custom theme setting
     * This theme setting is all from custom side
     * The theme source is required from custom link
     */
    user: ITianyuShellCoreUIThemeCustom;
    /**
     * Change application theme
     *
     * Notes:
     * 1. When using customized theme link, the theme color will be discarded
     * 2. The save parameter will be discarded if try to set with a customized theme link
     *
     * @param theme theme id or Tianyu Shell Theme name
     * @param color application theme color
     * @param save set the theme setting whether should be saved in local storage
     */
    change(theme: string, color: TianyuShellUIThemeColor, save?: boolean): void;
    /** Reset all themes and set theme to be default */
    reset(): void;
}

/** Tianyu Shell Core UI Dialog Layer Controller */
export interface ITianyuShellCoreUIDialogLayer {
    /**
     * Get count of opened dialog
     *
     * @returns return the count of opened dialogs
     */
    count(): number;
    /**
     * Create a dialog layer over the latest existing layer
     *
     * @returns return the new dialog layer id
     */
    create(): Promise<string | null>;
    /**
     * Get all created layers id
     *
     * @returns return all layers id
     */
    layers(): string[];
    /**
     * Switch using layer to specified layer
     *
     * @param layerId specified layer id
     */
    switch(layerId: string): void;
    /**
     * Remove specified layer by id
     *
     * @param layerId removed layer id
     */
    remove(layerId: string): void;
    /**
     * Get current using layer id
     *
     * @returns return layer id which is using
     */
    current(): string;
    /**
     * Get current using layer index of all layers
     *
     * @returns return layer index
     */
    index(): number;
}

/** Tianyu Shell UI Dialog Callback Value */
export interface ITianyuShellUIDialogCallbackValue {
    /** Dialog Selection Type */
    status: "Yes" | "No" | "Cancel";
    /** Dialog input value */
    data?: string;
}

/** Tianyu Shell UI Dialog APIs */
export interface ITianyuShellCoreUIDialog {
    /**
     * Open a dialog
     * Support TianyuUI element and string only element.
     * If string only element provided, to use tianyu shell dialog default ui
     *
     * @param element dialog element
     * @param button dialog buttons type (only valid for string only element)
     * @param type dialog view type (only valid for string only element)
     * @param close dialog should add a close button (only valid for string only element)
     * @param callback the selection callback function (only valid for string only element)
     *
     * @returns return the opened dialog id
     */
    open(
        element: TianyuUI | string,
        button?: TianyuShellUIDialogButtons,
        type?: TianyuShellUIDialogType,
        close?: boolean,
        callback?: CallbackActionT<ITianyuShellUIDialogCallbackValue>,
    ): string;
    /**
     * Close a dialog by dialog id
     *
     * @param id the closed dialog id
     */
    close(id: string): void;
    /**
     * Get dialog is opened
     *
     * @param id dialog id provides to get the specific dialog is opened or undefined to get whether any dialog is opened
     *
     * @returns return dialog is opened status
     */
    isOpen(id?: string): boolean;
    /** Tianyu Shell Core UI Dialog layer controller */
    layer: ITianyuShellCoreUIDialogLayer;
}

/**
 * Tianyu Shell UI Message Helper
 * The helper is used for layout setting
 */
export interface ITianyuShellUIMessageHelper {
    /**
     * Set message layer vertical align
     *
     * @param value the new vertical align
     */
    setVerticalAlign(value: ITianyuShellUIVerticalAlignment): void;
    /**
     * Set message layer vertical rate
     *
     * @param value the new vertical rate
     */
    setVerticalRate(value: number): void;
    /**
     * Set message layer horizontal align
     *
     * @param value the new horizontal align
     */
    setHorizontalAlign(value: ITianyuShellUIHorizontalAlignment): void;
    /**
     * Set message layer horizontal rate
     *
     * @param value the new horizontal rate
     */
    setHorizontalRate(value: number): void;
    /**
     * Set message auto close timestamp
     *
     * @param value the new timestamp
     */
    setTimestamp(value: number): void;

    /**
     * Get current message layer vertical align
     *
     * @returns message layer vertical align
     */
    getVerticalAlign(): ITianyuShellUIVerticalAlignment;
    /**
     * Get current message layer vertical rate
     *
     * @returns message layer vertical rate
     */
    getVerticalRate(): number;
    /**
     * Get current message layer horizontal align
     *
     * @returns message layer horizontal align
     */
    getHorizontalAlign(): ITianyuShellUIHorizontalAlignment;
    /**
     * Get current message layer horizontal rate
     *
     * @returns message layer horizontal rate
     */
    getHorizontalRate(): number;
    /**
     * Get current message auto close timestamp
     *
     * @returns message auto close timestamp
     */
    getTimestamp(): number;
}

/** Tianyu Shell Core UI Message APIs */
export interface ITianyuShellCoreUIMessage {
    /**
     * Post a message
     *
     * @param type message type
     * @param code message code
     * @param message message content string
     * @param title message title
     * @param detail message detail infomation
     * @param isTech a flag of the message is technical message or not
     * @param moreInfo message more info hyper link
     * @param troubleShot message trouble shot info hyper link
     */
    post(
        type: TianyuShellUIMessageType,
        code: string,
        message: string,
        title: string,
        detail: string[],
        isTech?: boolean,
        moreInfo?: TianyuShellUIHyperLink | undefined,
        troubleShot?: TianyuShellUIHyperLink | undefined,
    ): void;
    /**
     * Close a message
     *
     * @param id the closed message id
     */
    close(id: string): void;
    /**
     * Get a message is opened
     *
     * @param id the message id
     *
     * @returns return true if the message is opened, otherwise false
     */
    isOpen(id: string): boolean;
    /**
     * Get the count of all opened messages
     *
     * @returns return all opened messages count
     */
    count(): number;
    /** Tianyu Shell UI Message Helper */
    helper: ITianyuShellUIMessageHelper;
}

/** Tianyu Shell Core UI Background APIs */
export interface ITianyuShellCoreUIBackground {
    /**
     * Set the background color
     * SUPPORT
     * 1. HEX color value RGB&ARGB
     * 2. (var) Calculation color
     * 3. Predefined color name
     *
     * @param color the color string
     */
    setColor(color: string): void;
    /**
     * Get current background color
     *
     * @returns return the color string (color will not be translated, will return the origin color string)
     */
    getColor(): string;
    /** Remove current background color and reset to default background color */
    removeColor(): void;
    /**
     * Set an html element as background
     *
     * @param html the html element
     * @param id the html element id
     */
    setElement(html: HTMLElement, id?: string): void;
    /** Remove current used background html element */
    removeElement(): void;
    /** Clean all background color and html element and reset to default */
    clear(): void;
}

/** Tianyu Shell Core UI Major layer Helper APIs */
export interface ITianyuShellCoreUIMajorHelper {
    /**
     * add new CSS styles for Tianyu Shell Major Layer
     *
     * @param classNames the CSS styling names
     */
    addClass(...classNames: string[]): void;
    /**
     * add new tianyu shell styles for Tianyu Shell Major Layer
     *
     * @param classNames the tianyu shell styling
     */
    addStyle(...styles: (string | TianyuUIStyleDeclaration)[]): void;
    /**
     * remove a CSS style from Tianyu Shell Major Layer
     *
     * @param classNames the removed CSS styling name
     */
    removeClass(className: string): void;
    /**
     * remove a tianyu shell style from Tianyu Shell Major Layer
     *
     * @param classNames the removed tianyu shell styling name
     */
    resetStyle(): void;
}

/** Tianyu Shell Core UI Major layer APIs */
export interface ITianyuShellCoreUIMajor {
    /** Tianyu Shell Core UI Major Layer Helper APIs */
    helper: ITianyuShellCoreUIMajorHelper;

    /**
     * append a UI element to Tianyu Shell Major Layer
     *
     * @param element UI element
     */
    append(element: HTMLElement | TianyuUI): void;
    /**
     * append a UI element into specific HTML element
     *
     * @param id specific HTML element id or element object
     * @param element appended UI element
     */
    appendInto(id: string | HTMLElement, element: HTMLElement | TianyuUI): void;
    /**
     * remove a UI element from Major Layer
     *
     * @param element UI element
     */
    remove(element: HTMLElement | TianyuUI | string): void;
    /**
     * remove a UI element from specific HTML element
     *
     * @param id specific HTML element id or element object
     * @param element the removed UI element
     */
    removeFrom(id: string | HTMLElement, element: HTMLElement | TianyuUI | string): void;
    /**
     * get HTML element by element id
     *
     * @param elemId the element id
     *
     * @returns return HTML element objects
     */
    getElementById(elemId: string): HTMLElement[];
    /**
     * get HTML element by element class name
     *
     * @param className the element class name
     *
     * @returns return HTML element objects
     */
    getElementByClassName(className: string): Element[];
    /**
     * get HTML element by element tag name
     *
     * @param tagName the element tag name
     *
     * @returns return HTML element objects
     */
    getElementByTagName(tagName: string): Element[];
    /**
     * create a new Tianyu UI element object
     *
     * @param type the HTML element type
     * @param id the HTML element id, a guid string will be applied if no specified
     *
     * @returns return a new Tianyu Shell UI element object
     */
    createElement(type: keyof HTMLElementTagNameMap, id?: string): TianyuUI;
}

/** Tianyu Shell UI Css Styling Helper APIs */
export interface ITianyuShellUICssHelper {
    /**
     * Add a new styling or update a existing styling to html document
     *
     * @param key the styling key
     * @param link the stylink url
     */
    add(key: string, link: string): void;
    /**
     * Remove a styling from html document
     *
     * @param key the stylink key
     */
    remove(key: string): void;
}

/** Tianyu Shell Core UI Styling APIs */
export interface ITianyuShellCoreUIStyle {
    /** Tianyu Shell UI Css Styling Helper */
    css: ITianyuShellUICssHelper;
    /**
     * Add a customized styling to cache
     *
     * @param key the styling name
     * @param styling styling object
     * @param path the styling saved path
     */
    set(key: string, styling: TianyuUIStyleDeclaration, path?: string): void;
    /**
     * Get a customized styling
     *
     * If there are some same name styling during the path, the styling will be auto merged by param "isDepth"
     *
     * @param key styling name
     * @param path styling path
     * @param isDepth a flag to deep search stylings which have the same name and merge them
     *
     * @returns return styling object
     */
    get(key: string | string[], path?: string, isDepth?: boolean): TianyuUIStyleDeclaration;
    /**
     * Remove a customized styling
     *
     * @param key styling name
     * @param path styling path
     */
    remove(key: string, path?: string): void;
}

/** Tianyu Shell Core UI APIs */
export interface ITianyuShellUI {
    /** Tianyu Shell Core UI Background APIs */
    background: ITianyuShellCoreUIBackground;
    /** Tianyu Shell Core UI Dialog APIs */
    dialog: ITianyuShellCoreUIDialog;
    /** Tianyu Shell Core UI Major Layout APIs */
    major: ITianyuShellCoreUIMajor;
    /** Tianyu Shell Core UI Message APIs */
    message: ITianyuShellCoreUIMessage;
    /** Tianyu Shell Core UI Theme APIs */
    theme: ITianyuShellCoreUITheme;
    /** Tianyu Shell Core UI Styling APIs */
    style: ITianyuShellCoreUIStyle;
}

/** Tianyu Shell Core UI Configuration base */
export interface ITianyuShellUIConfigureCore {
    /** indicates the Tianyu Shell UI is supported or not */
    support: boolean;
    /** indicates the default Tianyu Shell UI background color */
    background: string;
}

/** Tianyu Shell Core UI Configuration of Theme */
export interface ITianyuUIThemeConfigure extends ITianyuShellCookieConfigure {
    /**
     * Tianyu Shell Customized Theme URL
     * The URL is the customized theme resources link and other style will be gotten by this url.
     *
     * E.G.:
     * pre-URL is https://resource.aitianyu.cn/resources/tianyu-shell/common
     * the style name is example.css
     *
     * the Target style link is: https://resource.aitianyu.cn/resources/tianyu-shell/common/example.css
     */
    themeUrl: string;
    /** The default Theme name */
    defaultTheme: string;
    /** The default Theme color value */
    defaultThemeColor: number;
}

/** Tianyu Shell Core UI Configuration */
export interface ITianyuShellUIConfigure {
    /** Tianyu Shell UI Core APIs */
    core: ITianyuShellUIConfigureCore;
    /** Tianyu Shell UI Theme Configuration*/
    theme: ITianyuUIThemeConfigure;
}
