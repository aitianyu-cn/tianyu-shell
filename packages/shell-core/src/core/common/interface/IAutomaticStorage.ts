/**@format */

/** Automatic Storage content structure */
export interface IStorageContentItem {
    flag: boolean;
    timeStamp: number;
    data: any;
}

/** Define the default interval time of storage watch dog timer */
export const DefaultStorageWatchDogTimer = 300000;

/** Define the minimum interval time of storage watch dog timer */
export const MinimumStorageWatchDogTimer = 300000;
