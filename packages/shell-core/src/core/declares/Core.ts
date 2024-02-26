/**@format */

/** Tianyu Shell Environment Type */
export type CoreEnvironment = "production" | "development";

/** Cookie API of Tianyu Shell */
export interface ITianyuShellCookie {
    /**
     * Set or update cookie value
     *
     * @param key the cookie name
     * @param value cookie value
     * @param domain the domain URL of the cookie
     * @param path sub-path of domain
     * @param expires valid during time
     * @param escaped use escape to encode value
     */
    set(key: string, value: string, domain?: string, path?: string, expires?: Date, escaped?: boolean): void;
    /**
     * Get a value from cookie
     *
     * @param key the value name
     * @param notFound the fallback value when the specific value is not found
     *
     * @returns return the value or fallback value
     */
    get(key: string, notFound?: string): string;
    /**
     * Remove a value from cookie
     *
     * @param key the value name
     * @param path the domain URL sub-path
     * @param domain the domain URL
     */
    remove(key: string, path?: string, domain?: string): void;
}

/** Tianyu Shell Core Runtime Configuration */
export interface ITianyuShellCoreRuntime {
    /** Enable Console log */
    console: boolean;
}

/** Tianyu Shell Basic Configuration */
export interface ITianyuShellCoreBaseConfigure {
    /** Runtime Configuration */
    runtime: ITianyuShellCoreRuntime;
    /** System Environment */
    environment: CoreEnvironment;
    /** Application Version */
    version: string;
}

/** Tianyu Shell Configuration */
export interface ITianyuShellCoreConfigure extends ITianyuShellCoreBaseConfigure {
    /** Mobile Runtime flag */
    isMobile: boolean;
    /** IOS Runtime flag */
    isIOS: boolean;
    /** Mac OS Runtime flag */
    isMac: boolean;
}

/** Tianyu Shell Plugin Setting */
export interface ITianyuShellPluginSetting {
    /** To support Tianyu Shell Plugin globalize */
    globalize: boolean;
}

/** Tianyu Shell Runtime Setting */
export interface ITianyuShellRuntimeSetting {
    /** To enable Global Cache */
    enableCache: boolean;
    /** To enable Global Storage */
    enableStorage: boolean;
}

/** Tianyu Shell Runtime Supporting */
export interface ITianyuShellRuntimeSupport {
    /**
     * To Support Tianyu Shell Native Router
     *
     * !!!IMPORTANT
     * If the flag is false, to use Router will cause an error
     */
    router: boolean;
}
