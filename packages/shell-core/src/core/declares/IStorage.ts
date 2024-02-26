/**@format */

/** Tianyu Shell Storage Watch Dog APIS */
export interface IStorageWatchDog {
    /** Start Watch Dog */
    startWatchDog(): void;
    /** End Watch Dog */
    endWatchDog(): void;
}

/** Tianyu Shell Storage Interface */
export interface IStorage {
    /**
     * Set a value in storage
     *
     * @param key the value name
     * @param content value data
     * @param forceTimestamp set the value should be collected automatically
     */
    setValue(key: string, content: any, forceTimestamp?: boolean): void;
    /**
     * Get a value from storage
     *
     * @param key the value name
     *
     * @returns return value if it is found or return null
     */
    getValue(key: string): any;
    /**
     * Remove a value from storage
     *
     * @param key the value name
     */
    delValue(key: string): void;
    /**
     * Get a number that is the storage values count
     *
     * @returns return the count number
     */
    count(): number;
    /**
     * Check the storage contains a value id or not.
     *
     * @param key the value id
     * @returns return true if the value does exist, otherwish false
     */
    containsKey(key: string): boolean;
    /**
     * Update the time stamp of specific value to avoid out of date.
     *
     * @param key the value id
     */
    updateStamp(key: string): void;
}

/** Tianyu Shell Global Cache Storage Interface */
export interface ITianyuShellGlobalCache {
    /** Storage watch dog interface */
    watchDog: IStorageWatchDog;
    /** Storage entity */
    storage: IStorage;
}
