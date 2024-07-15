/**@format */

import { ITianyuShellCookie, ITianyuShellCoreConfigure } from "./Core";
import { IFeatureToggle } from "./Features";
import { ITianyuShellCoreConsole } from "./Console";
import { ITianyuShellUI } from "./ui/UserInterface";
import { ITianyuShellGlobalCache } from "./IStorage";
import { ITianyuShellGlobalSyncs } from "./Sync";
import { IStore, InstanceId } from "@aitianyu.cn/tianyu-store";

/** Tianyu Shell Core APIs */
export interface ITianyuShellCore {
    /** Tianyu Shell Cookie API */
    cookie: ITianyuShellCookie;
    /** Tianyu Shell Event API */
    event: boolean;
    /** Tianyu Shell Console API */
    console: ITianyuShellCoreConsole;
    /** Tianyu Shell Configure API */
    configure: ITianyuShellCoreConfigure;
    /** Tianyu Shell FeatureToggle API */
    featureToggle: IFeatureToggle;
    /** Tianyu Shell UI Operations */
    ui: ITianyuShellUI;
}

/** Tianyu Store APIs */
export interface ITianyuShellUIStore {
    /** Tianyu Store */
    store: IStore;
    /** Base Instance Id */
    instanceId: InstanceId;
    /** Instance Supports Redo Undo Operation */
    histroyInstance: InstanceId;
    /** Instance Not support redo undo */
    nonHisInstance: InstanceId;
}

/** Tianyu Shell Runtime APIs */
export interface ITianyuShellRuntime {
    /** Tianyu Shell Global Cache Interface */
    cache: ITianyuShellGlobalCache;
    /** Tianyu Shell Global Synced Data Cache */
    sync: ITianyuShellGlobalSyncs;
    /** Tianyu Store */
    store: ITianyuShellUIStore;
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

/**
 * Tianyu Shell Event Trigger Callback
 *
 * @param ev System UI Event
 */
export type TianyuShellGenericEventCallback<T> = (oldState?: T, newState?: T) => void;

/**
 * Language modify type
 * To indicate what type of languages (pending or support) will be modified
 */
export type TianyuShellLanguageRegisterType = "pending" | "support";
