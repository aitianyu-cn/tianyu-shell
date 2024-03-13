/**@format */

import { MapOfString } from "@aitianyu.cn/types";
import { TianyuShellProcessor } from "../../../core/utils/Processor";
import {
    ITianyuShellCoreUITheme,
    ITianyuShellCoreUIThemeCustomManager,
    TianyuShellUIThemeColor,
} from "../../../core/declares/ui/UserInterface";
import { ITianyuShell } from "../../../core/declares/Declare";
import { Cookie, ICookieSetOptions } from "../../../core/plugin/Cookie";
import {
    TianyuShellUIThemeCustomID,
    TianyuShellUICustomAppliedPreious,
    TianyuShellUIThemeCustomCookieTheme,
    TianyuShellUIThemeCustomCookieColor,
    TianyuShellUIThemeDefaultID,
} from "../../common/Declare";
import { ThemeURLHandler } from "../../resources/URLHandler";
import { UIValidation } from "shell-core/src/core/utils/UIValidation";
import { Log } from "shell-core/src/core/plugin/Console";
import * as MessageBundle from "../../resources/i18n/Message";

const _runtimeUIConfigure = TianyuShellProcessor.getUIConfigures();
const _customThemes: MapOfString = {};

let _customAppliedThemes: string[] = [];

function _change_theme_internal(theme: string, color: TianyuShellUIThemeColor, setCookie: boolean): void {
    // check whether the theme is a custom defined theme
    const customThemeURL = _customThemes[theme];
    if (customThemeURL) {
        if (_customAppliedThemes.includes(theme)) {
            // if the theme is applied already, return directly
            return;
        } else {
            // if the theme is not applied, to save it.
            _customAppliedThemes.push(theme);
        }
    }
    // the get the url from customTheme or default themes from tianyu shell
    const themeUrl =
        customThemeURL ||
        (() => {
            const validTheme = UIValidation.validateTheme(theme);
            return validTheme ? ThemeURLHandler.getURL(validTheme, color) : undefined;
        })();
    const isCustomTheme = !!customThemeURL;
    if (!themeUrl) {
        // if theme is not valid
        // to post an error
        Log.error(
            isCustomTheme
                ? MessageBundle.getText("TIANYU_UI_THEME_NOT_VALID_CUSTOM_THEME")
                : MessageBundle.getText("TIANYU_UI_THEME_NOT_VALID_THEME", theme),
        );
        return;
    }

    // remove current custom theme if is not the custom applied theme
    const element = !isCustomTheme && document.getElementById(TianyuShellUIThemeCustomID);
    if (element) {
        element.remove();
    }

    // set new theme
    const customTheme = document.createElement("link");
    customTheme.href = themeUrl;
    customTheme.rel = "stylesheet";
    customTheme.type = "text/css";
    // set the customTheme id: if is custom applied theme, use the custom theme name,
    // otherwise use tianyu shell general id.
    customTheme.id = isCustomTheme ? `${TianyuShellUICustomAppliedPreious}_${theme}` : TianyuShellUIThemeCustomID;

    document.head.appendChild(customTheme);

    const ui = !isCustomTheme && ((window as any).tianyuShell as ITianyuShell)?.core?.ui;
    if (ui) {
        ui.theme.custom.valid = true;
        ui.theme.custom.theme = theme;
        ui.theme.custom.color = color;

        if (setCookie) {
            const date = new Date(Date.now());
            const expires = new Date(date.setDate(date.getDate() + 30));
            const cookieOption: ICookieSetOptions = {
                expires: expires,
            };
            if (_runtimeUIConfigure.theme.domain) {
                cookieOption.domain = _runtimeUIConfigure.theme.domain;
            }
            if (_runtimeUIConfigure.theme.path) {
                cookieOption.path = _runtimeUIConfigure.theme.path;
            }
            Cookie.set(TianyuShellUIThemeCustomCookieTheme, theme, cookieOption);
            Cookie.set(TianyuShellUIThemeCustomCookieColor, color, cookieOption);
        }
    }
}

function _change_theme(theme: string, color: TianyuShellUIThemeColor, save?: boolean): void {
    _change_theme_internal(theme, color, !!save);
}

function __reset_custom_theme(): void {
    for (const theme of _customAppliedThemes) {
        const themeId = `${TianyuShellUICustomAppliedPreious}_${theme}`;
        const element = document.getElementById(themeId);
        if (element) {
            document.head.removeChild(element);
        }
    }

    _customAppliedThemes = [];
}

function _reset_theme(): void {
    const element = document.getElementById(TianyuShellUIThemeCustomID);
    if (element) {
        document.head.removeChild(element);
        const ui = ((window as any).tianyuShell as ITianyuShell)?.core?.ui;
        if (!!ui) {
            ui.theme.custom.valid = false;

            Cookie.remove(TianyuShellUIThemeCustomCookieTheme, _runtimeUIConfigure.theme.path, _runtimeUIConfigure.theme.domain);
            Cookie.remove(TianyuShellUIThemeCustomCookieColor, _runtimeUIConfigure.theme.path, _runtimeUIConfigure.theme.domain);
        }
    }

    // to remove custom applied theme
    __reset_custom_theme();
}

function _get_custom_theme(): string[] {
    return _customAppliedThemes.concat();
}

function _contains_custom_theme(id: string): boolean {
    return _customAppliedThemes.includes(id);
}

function _remove_custom_theme(id: string): void {
    if (!_customAppliedThemes.includes(id)) {
        return;
    }

    const themeId = `${TianyuShellUICustomAppliedPreious}_${id}`;
    const element = document.getElementById(themeId);
    if (element) {
        document.head.removeChild(element);
    }

    const newAppliedThemes: string[] = [];
    for (const theme of _customAppliedThemes) {
        theme !== id && newAppliedThemes.push(theme);
    }
    _customAppliedThemes = newAppliedThemes;
}

function __init_default_theme_from_configure(): void {
    const theme = _runtimeUIConfigure.theme.defaultTheme;
    const color = _runtimeUIConfigure.theme.defaultThemeColor;
    const themeColor: TianyuShellUIThemeColor | null = color === 1 ? "light" : color === 0 ? "dark" : null;

    if (!!theme && !!themeColor) {
        const defaultTheme = document.createElement("link");
        defaultTheme.href = ThemeURLHandler.getURL(theme, themeColor);
        defaultTheme.rel = "stylesheet";
        defaultTheme.type = "text/css";
        defaultTheme.id = TianyuShellUIThemeDefaultID;

        document.head.appendChild(defaultTheme);

        const themeContainer = ((window as any).tianyuShell as ITianyuShell)?.core?.ui?.theme;
        if (themeContainer) {
            themeContainer.default.valid = true;
            themeContainer.default.theme = theme;
            themeContainer.default.color = themeColor;
        }
    }
}

function __init_customer_theme_from_cookie(): void {
    const theme = Cookie.get(TianyuShellUIThemeCustomCookieTheme);
    const color = Cookie.get(TianyuShellUIThemeCustomCookieColor).toLowerCase();

    const themeColor: TianyuShellUIThemeColor | null = color === "light" ? "light" : color === "dark" ? "dark" : null;

    if (!!theme && !!themeColor) {
        _change_theme_internal(theme, themeColor, false);
    }
}

function _custom_theme_getter_add(themeId: string, style: string): void {
    if (!!_customThemes[themeId]) {
        return;
    }

    _customThemes[themeId] = `${_runtimeUIConfigure.theme.themeUrl}/${style}`;
}

function _custom_theme_getter_update(themeId: string, style: string): void {
    _customThemes[themeId] = `${_runtimeUIConfigure.theme.themeUrl}/${style}`;

    // if the updated theme is not in using, not to do further things.
    if (!_customAppliedThemes.includes(themeId)) {
        return;
    }

    const customThmemId = `${TianyuShellUICustomAppliedPreious}_${themeId}`;
    const oldElement = document.getElementById(customThmemId);
    if (!oldElement) {
        // if the element is not found, to remove the theme from applied list.
        const newAppliedThemes: string[] = [];
        for (const theme of _customAppliedThemes) {
            theme !== themeId && newAppliedThemes.push(theme);
        }
        _customAppliedThemes = newAppliedThemes;
        return;
    }

    const newCustomThemeElement = document.createElement("link");
    newCustomThemeElement.href = _customThemes[themeId];
    newCustomThemeElement.rel = "stylesheet";
    newCustomThemeElement.type = "text/css";
    newCustomThemeElement.id = customThmemId;
    document.head.replaceChild(newCustomThemeElement, oldElement);
}

function _custom_theme_getter_delete(themeId: string): void {
    if (!!_customThemes[themeId]) {
        delete _customThemes[themeId];

        // to remove the theme from ui if it is using.
        _remove_custom_theme(themeId);
    }
}

function _custom_theme_getter_getThemes(): string[] {
    return Object.keys(_customThemes);
}

function _custom_theme_getter_getUrl(themeId: string): string {
    return _customThemes[themeId] || "";
}

const _customThemeGetter: ITianyuShellCoreUIThemeCustomManager = {
    add: _custom_theme_getter_add,
    update: _custom_theme_getter_update,
    delete: _custom_theme_getter_delete,
    getThemes: _custom_theme_getter_getThemes,
    getUrl: _custom_theme_getter_getUrl,
};

const _theme: ITianyuShellCoreUITheme = {
    default: {
        valid: false,
        theme: "",
        color: "light",
    },
    custom: {
        valid: false,
        theme: "",
        color: "light",
    },
    change: _change_theme,
    reset: _reset_theme,

    user: {
        get: _get_custom_theme,
        contains: _contains_custom_theme,
        remove: _remove_custom_theme,
        reset: __reset_custom_theme,
        manager: _customThemeGetter,
    },
};

export function initTianyuShellCoreUITheme(): void {
    const windowObj = window as any;
    if (!!!(windowObj.tianyuShell as ITianyuShell)?.core?.ui?.theme) {
        (windowObj.tianyuShell as ITianyuShell) = {
            ...(windowObj.tianyuShell || {}),
            core: {
                ...((windowObj.tianyuShell as ITianyuShell)?.core || {}),
                ui: {
                    ...((windowObj.tianyuShell as ITianyuShell)?.core?.ui || {}),
                    theme: _theme,
                },
            },
        };

        __init_default_theme_from_configure();
        __init_customer_theme_from_cookie();
    }
}
