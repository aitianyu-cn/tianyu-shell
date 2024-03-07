/**@format */

import { ITianyuShellCookie, ITianyuShellCoreConfigure } from "./Core";
import { ITianyuShellCoreEvents } from "./Event";
import { IFeatureToggle } from "./Features";
import { ITianyuShellLanguage } from "./Language";
import { ITianyuShellCoreConsole } from "./Console";
import { ITianyuRouterProvider } from "./Router";
import { ITianyuShellUI } from "./ui/UserInterface";
import { ITianyuShellGlobalCache } from "./IStorage";
import { ITianyuShellGlobalSyncs } from "./Sync";

/** Tianyu Shell Core APIs */
export interface ITianyuShellCore {
    /** Tianyu Shell Cookie API */
    cookie: ITianyuShellCookie;
    /** Tianyu Shell Event API */
    event: ITianyuShellCoreEvents;
    /** Tianyu Shell Language API */
    language: ITianyuShellLanguage;
    /** Tianyu Shell Console API */
    console: ITianyuShellCoreConsole;
    /** Tianyu Shell Configure API */
    configure: ITianyuShellCoreConfigure;
    /** Tianyu Shell FeatureToggle API */
    featureToggle: IFeatureToggle;
    /** Tianyu Shell Router Interface */
    router: ITianyuRouterProvider;
    /** Tianyu Shell UI Operations */
    ui: ITianyuShellUI;
}

/** Tianyu Shell Runtime APIs */
export interface ITianyuShellRuntime {
    /** Tianyu Shell Global Cache Interface */
    cache: ITianyuShellGlobalCache;
    /** Tianyu Shell Global Synced Data Cache */
    sync: ITianyuShellGlobalSyncs;
}

/**
 * Tianyu Shell Basic Infra APIs
 * This will include all the global APIs and Interfaces
 */
export interface ITianyuShell {
    /** Prototype define */
    prototype: ITianyuShell;
    /** Tianyu Shell Core APIs */
    core: ITianyuShellCore;
    /** Tianyu Shell Runtime APIs */
    runtime: ITianyuShellRuntime;
}
