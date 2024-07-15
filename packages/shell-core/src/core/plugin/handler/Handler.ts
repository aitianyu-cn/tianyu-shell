/** @format */

import { initTianyuShellConsole } from "./ConsoleHandler";
import { initTianyuShellCookie } from "./CookieHandler";
import { initTianyuShellEvent } from "./EventHandler";
import { initTianyuShellFeatureToggle } from "./FeatureToggleHandler";
import { initTianyuShellRuntime } from "./RuntimeHandler";

export function loadHandlers(): void {
    initTianyuShellConsole();
    initTianyuShellCookie();
    initTianyuShellEvent();
    initTianyuShellFeatureToggle();
    initTianyuShellRuntime();
}
