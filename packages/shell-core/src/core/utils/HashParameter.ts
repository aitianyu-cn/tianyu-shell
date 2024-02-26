/**@format */

import { MapOfString } from "@aitianyu.cn/types";

/** URL hash parameter helper */
export class HashParameter {
    /**
     * Parse a parameter string to a parameter map
     * 
     * @param param the parameter string
     * @returns return the parameter map
     */
    public static parse(param?: string): MapOfString {
        const result: MapOfString = {};

        // if the hash parameter is not assigned, to get hash from window.location
        if (!param) {
            const hashUrl = (window.location.hash as string).substring(1);
            param = hashUrl.split("?")[1] || "";
        }

        if (!!param) {
            // split string by "&"
            const paramPairs = param.split("&");
            for (const pair of paramPairs) {
                const pairKV = pair.split("=");
                if (pairKV.length > 1) {
                    const key = pairKV[0];
                    let value = pairKV[1];
                    for (let i = 2; i < pairKV.length; ++i) value += `=${pairKV[i]}`;

                    result[key] = value;
                }
            }
        }

        return result;
    }

    /**
     * Parse the parameter map to be a equally string
     * 
     * @param params the parameter map
     * @returns return a string equals parameter map
     */
    public static stringify(params: MapOfString): string {
        const paramsArray: string[] = [];
        for (const key of Object.keys(params)) {
            paramsArray.push(`${key}=${params[key]}`);
        }

        if (paramsArray.length > 0) {
            return paramsArray.join("&");
        }

        return "";
    }

    /**
     * Format parameter map to be a hash style string
     * 
     * @param params the parameter map
     * @returns return a string equals parameter map
     */
    public static format(params: MapOfString): string {
        const toString = HashParameter.stringify(params);
        if (!!toString) {
            return `?${toString}`;
        }
        return "";
    }
}
