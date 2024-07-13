/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState } from "../State";
import { isMobile } from "../../Runtime";
import { getLanguage } from "infra/Language";
import { parseAreaString } from "@aitianyu.cn/types";
import { languageDef, themeList } from "infra/Compatibility";

export const CreateTianyuShellCoreAction = ActionFactor.makeCreateStoreAction<ITianyuShellCoreState>().withReducer(
    function (_) {
        return {
            event: {
                loadState: false,
                urlHash: (window.location.hash as string).substring(1),
                pageResize: isMobile ? window.outerWidth : window.innerWidth,
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
        };
    },
);

export const DestroyTianyuShellCoreAction = ActionFactor.makeDestroyStoreAction();
