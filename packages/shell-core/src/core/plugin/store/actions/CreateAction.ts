/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState } from "../State";
import { getLanguage } from "infra/Language";
import { parseAreaString } from "@aitianyu.cn/types";
import { languageDef, themeList } from "infra/Compatibility";
import { getIsMobile } from "../../helper/RuntimeHelper";

export const CreateTianyuShellCoreAction = ActionFactor.makeCreateStoreAction<ITianyuShellCoreState>().withReducer(
    function (_) {
        return {
            event: {
                loadState: false,
                urlHash: (window.location.hash as string).substring(1),
                pageResize: getIsMobile() ? window.outerWidth : window.innerWidth,
            },
            featureToggle: {
                features: {},
                dependencies: {},
            },
            language: {
                current: parseAreaString(getLanguage()),
            },
            compatibility: {
                language: languageDef(),
                theme: themeList(),
            },
            capture: {
                list: [],
                classifies: {},
                time: Date.now(),

                operationKey: 0,
                operationType: "start",
                operationMsg: "",
            },
        };
    },
);

export const DestroyTianyuShellCoreAction = ActionFactor.makeDestroyStoreAction();
