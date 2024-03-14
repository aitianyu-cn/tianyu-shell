/**@format */

import { MapOfType } from "@aitianyu.cn/types";
import { Router } from "shell-core/index";

export interface IHashMappedItem<T> {
    key: string;
    value: T | null;
}

export class HashHelper {
    public static getHashMappedItem<T>(
        source: MapOfType<T>,
        defaultItem: string,
        specifiedHash?: string,
        fnEachItem?: (routerKey: T) => void,
    ): IHashMappedItem<T> {
        const rawHash = specifiedHash || Router.getHash();
        // set the hash is like /xxx/
        const formattedHash = rawHash.startsWith("/") ? rawHash : `/${rawHash}`;
        const formattedHash2 = formattedHash.endsWith("/") ? formattedHash : `${formattedHash}/`;

        // if the hash is empty, set it to default
        const hash = formattedHash2 === "/" ? defaultItem : formattedHash2;
        let fullMatch: IHashMappedItem<T> = {
            key: "",
            value: null,
        };

        for (const routerKey of Object.keys(source)) {
            const routerObj = source[routerKey];
            // make sure the routerKey string is start and end of '/'
            if (
                (routerKey.endsWith("/") && hash.startsWith(routerKey)) ||
                (!routerKey.endsWith("/") && hash.startsWith(`${routerKey}/`))
            ) {
                // use the longest prefix match
                // e.g.
                // hash: h1/h2/abc
                // list: h1 = 0, h1/h2 = 1
                // after matching, the result is 1
                const isMatchNew = fullMatch.value || fullMatch.key.length < routerKey.length;
                if (isMatchNew) {
                    fullMatch.key = routerKey;
                    fullMatch.value = routerObj;
                }
            }

            // for each item, to call each item function
            fnEachItem?.(routerObj);
        }

        return fullMatch;
    }
}
