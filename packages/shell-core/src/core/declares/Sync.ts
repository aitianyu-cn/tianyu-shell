/**@format */

/** Tianyu Shell Global Synced Data Cache */
export interface ITianyuShellGlobalSyncs {
    /** synced language data cache from tianyu resources lib */
    language?: {
        [key: string]: string[];
        pending: string[];
        support: string[];
    };
    /** synced theme data cache from tianyu resources lib */
    theme?: string[];
}
