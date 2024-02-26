/**@format */

/**
 * Tianyu Shell Router Callback Function
 *
 * @param ev Router callback event
 */
export type RouterCallback = (ev: IRouterCallbackEvent) => void;

/** Router callback event interface */
export interface IRouterCallbackEvent {
    /** new hash value */
    hash: string;
    /** old url link */
    oldURL?: string;
}

/** Tianyu Shell Router APIs Provider */
export interface ITianyuRouterProvider {
    /**
     * Set a value indicates the router provider should check the hash value by regex anyway.
     * Event the route path is found by directly router path
     *
     * @param force boolean value
     */
    forceRegex(force: boolean): void;
    /**
     * Add a router path
     *
     * @param path router path string
     * @param callback router callback function
     */
    addRoutePath(path: string, callback: RouterCallback): void;
    /**
     * add a router matching regex
     *
     * @param id regex id
     * @param reg regex exp
     * @param callback router callback function
     * @param priority priority number to indicate the regex should be firstly used or not
     */
    addRouteRegex(id: string, reg: RegExp, callback: RouterCallback, priority: number): void;
    /**
     * Remove a router path
     *
     * @param path router path string
     */
    removeRoutePath(path: string): void;
    /**
     * Remove a router regex
     *
     * @param id regex id
     */
    removeRouteRegex(id: string): void;
    /**
     * Set a router failed callback
     *
     * @param callback callback function
     */
    setRouteFail(callback: RouterCallback): void;
    /** Reset router failed function to default */
    resetRouteFail(): void;
    /**
     * Jump the URL to new hash value
     *
     * @param hash new hash value
     * @param rollback flag indicates the new hash value supports rollback or not
     * @param id new hash value recording id
     */
    jump(hash: string, rollback?: boolean, id?: string): void;
    /** Jump back the URL to old one if the old one is valid*/
    back(): void;
    /** Jump the URL to new one if the new one is valid */
    forward(): void;
    /** Jump the URL to the begin */
    start(): void;
    /** Jup the URL to the lastest */
    end(): void;
    /**
     * Set the URL to forward or back specific times
     * If the target value is out of range of URL cache, to jump to start or end instead
     *
     * @param target the jump times
     */
    go(target: number | string): void;
    /**
     * From current status, jump forward or back some steps according to the delta value.
     *
     * @param delta jump delta value
     */
    move(delta: number): void;
    /** get all URL jump history */
    history(): string[];
    /** get current URL id */
    current(): string;
    /** get size of current URL history list */
    length(): number;
}
