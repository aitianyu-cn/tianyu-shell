/** @format */

import { ITianyuShellCoreUIThemeItem, TianyuShellUIThemeColor } from "shell-core/src/core/declares/ui/UserInterface";
import { formatUserThemeId } from "../../tools/UserStylingHelper";
import { Cookie } from "shell-core/src/core/plugin/Cookie";
import {
    TianyuShellUIThemeCustomCookieTheme,
    TianyuShellUIThemeCustomCookieColor,
    TianyuShellUIThemeCustomID,
} from "../../common/Declare";
import { UIValidation } from "shell-core/src/core/utils/UIValidation";
import { ThemeURLHandler } from "../../resources/URLHandler";
import {
    TianyuShellInfraInterfaceExpose,
    getTianyuShellInfraInstanceId,
} from "shell-core/src/core/utils/InfraInterfaceExpose";
import { getStore } from "shell-core/src/core/utils/Store";
import { ICookieSetOptions } from "shell-core/src/core/declares/Cookie";

export function removeUserTheme(themeId: string): boolean {
    const id = formatUserThemeId(themeId);
    const element = document.getElementById(id);
    if (element) {
        document.head.removeChild(element);
        return true;
    }

    return false;
}

export function addUserTheme(themeId: string, url: string): void {
    const id = formatUserThemeId(themeId);
    const newCustomThemeElement = document.createElement("link");
    newCustomThemeElement.href = url;
    newCustomThemeElement.rel = "stylesheet";
    newCustomThemeElement.type = "text/css";
    newCustomThemeElement.id = id;
    document.head.appendChild(newCustomThemeElement);
}

export function getDefaultThemeFromConfigure(): ITianyuShellCoreUIThemeItem {
    const runtimeUIConfigure = getStore().selecteWithThrow(
        TianyuShellInfraInterfaceExpose.getUIConfigures(getTianyuShellInfraInstanceId()),
    );
    const theme = runtimeUIConfigure.theme.defaultTheme;
    const color = runtimeUIConfigure.theme.defaultThemeColor;
    const themeColor: TianyuShellUIThemeColor = color === 0 ? "dark" : "light";

    return {
        theme: theme,
        color: themeColor,
    };
}

export function getCustomThemeFromCookie(): ITianyuShellCoreUIThemeItem {
    const theme = Cookie.get(TianyuShellUIThemeCustomCookieTheme);
    const color = Cookie.get(TianyuShellUIThemeCustomCookieColor).toLowerCase();

    const validTheme = UIValidation.validateTheme(theme);
    const validColor = color === "light" ? "light" : "dark";
    return validTheme
        ? {
              theme: validTheme,
              color: validColor,
          }
        : getDefaultThemeFromConfigure();
}

export function saveCustomThemeInCookie(theme: string, color: TianyuShellUIThemeColor): void {
    const runtimeUIConfigure = getStore().selecteWithThrow(
        TianyuShellInfraInterfaceExpose.getUIConfigures(getTianyuShellInfraInstanceId()),
    );
    const date = new Date(Date.now());
    const expires = new Date(date.setDate(date.getDate() + 30));
    const cookieOption: ICookieSetOptions = {
        expires: expires,
    };
    if (runtimeUIConfigure.theme.domain) {
        cookieOption.domain = runtimeUIConfigure.theme.domain;
    }
    if (runtimeUIConfigure.theme.path) {
        cookieOption.path = runtimeUIConfigure.theme.path;
    }
    Cookie.set(TianyuShellUIThemeCustomCookieTheme, theme, cookieOption);
    Cookie.set(TianyuShellUIThemeCustomCookieColor, color, cookieOption);
}

export function updateTianyuShellTheme(theme: string, color: TianyuShellUIThemeColor): void {
    const element = document.getElementById(TianyuShellUIThemeCustomID);

    const newElement = document.createElement("link");
    newElement.href = ThemeURLHandler.getURL(theme, color);
    newElement.rel = "stylesheet";
    newElement.type = "text/css";
    newElement.id = TianyuShellUIThemeCustomID;

    if (element) {
        document.head.replaceChild(newElement, element);
    } else {
        document.head.appendChild(newElement);
    }
}
