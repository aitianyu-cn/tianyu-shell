/**@format */

import { IStorage, IStorageWatchDog } from "../declares/IStorage";
import { Log } from "../plugin/Console";
import { getText } from "./i18n/Message";
import {
    IStorageContentItem,
    DefaultStorageWatchDogTimer,
    MinimumStorageWatchDogTimer,
} from "./interface/IAutomaticStorage";

interface IStorageContent {
    [key: string]: IStorageContentItem;
}

/** Tianyu Shell Automatic Storage */
export class AutomaticStorage implements IStorage, IStorageWatchDog {
    private oContent: IStorageContent;

    private iTimer: number;

    /** Constructor */
    public constructor() {
        this.oContent = {};

        this.iTimer = 0;
    }

    /**
     * Set a value into storage
     *
     * @param key the value id
     * @param content value content
     * @param forceTimestamp a flag for watch dog out of date checking
     */
    public setValue(key: string, content: any, /* istanbul ignore next */ forceTimestamp = false): void {
        this.oContent[key] = {
            flag: true,
            timeStamp: forceTimestamp ? Date.now() : -1,
            data: content,
        };
    }

    /**
     * Get a value from storage
     *
     * @param key the value id
     * @returns return the value data (get null if the value does not exist)
     */
    public getValue(key: string): any {
        if (this.oContent[key]) {
            this.oContent[key].flag = true;
            this.oContent[key].timeStamp =
                this.oContent[key].timeStamp === -1
                    ? /* istanbul ignore next */ -1
                    : /* istanbul ignore next */ Date.now();

            return this.oContent[key].data;
        }

        return null;
    }

    /**
     * Delete a value from storage
     *
     * @param key the value id
     */
    public delValue(key: string): void {
        if (this.oContent[key]) {
            delete this.oContent[key];
        }
    }

    /**
     * Get all values count of the storage
     *
     * @returns return the count of all storage values
     */
    public count(): number {
        return Object.keys(this.oContent).length;
    }

    /**
     * Check the storage contains a value id or not.
     *
     * @param key the value id
     * @returns return true if the value does exist, otherwish false
     */
    public containsKey(key: string): boolean {
        return !!this.oContent[key];
    }

    /**
     * Update the time stamp of specific value to avoid out of date.
     *
     * @param key the value id
     */
    public updateStamp(key: string): void {
        if (this.oContent[key]) {
            this.oContent[key].flag = true;
            this.oContent[key].timeStamp = this.oContent[key].timeStamp === -1 ? -1 : Date.now();
        }
    }

    /**
     * Start a watch dog for current storage to collect out of date values automatically.
     *
     * @param timer the watch dog running time stamp
     */
    public startWatchDog(/* istanbul ignore next */ timer: number = DefaultStorageWatchDogTimer): void {
        Log.warn(getText("STORAGE_WATCH_DOG_START"));
        if (timer < MinimumStorageWatchDogTimer) {
            Log.error(getText("STORAGE_WATCH_DOG_TIMER_LESSTHAN_MIN", [timer, MinimumStorageWatchDogTimer]));
            timer = MinimumStorageWatchDogTimer;
        }

        this.endWatchDog();

        this.iTimer = window.setInterval(this.watchDog.bind(this), timer);
    }

    /**Stop the watch dog */
    public endWatchDog(): void {
        if (this.iTimer) {
            Log.warn(getText("STORAGE_WATCH_DOG_END"));

            window.clearInterval(this.iTimer);
            this.iTimer = 0;
        }
    }

    private watchDog(): void {
        Log.warn(getText("STORAGE_WATCH_DOG_INVOKE"));

        const keys = Object.keys(this.oContent);

        const aCleanList: string[] = [];
        for (const key of keys) {
            const value = this.oContent[key];
            if (value.timeStamp === -1) {
                continue;
            }

            if (!value.flag) {
                aCleanList.push(key);
            }

            const timeSpan = Date.now() - value.timeStamp;
            if (timeSpan > DefaultStorageWatchDogTimer) {
                value.flag = false;
            }
        }

        for (const key of aCleanList) {
            delete this.oContent[key];
        }
    }
}
