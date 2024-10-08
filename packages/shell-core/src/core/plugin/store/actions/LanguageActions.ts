/** @format */

import { ActionFactor, Missing, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState } from "../State";
import { AreaCode, parseAreaCode } from "@aitianyu.cn/types";
import { IsLanguageSuppprted } from "../selectors/LanguageSelector";
import { TianyuShellInfraInterfaceExpose } from "shell-core/src/core/utils/InfraInterfaceExpose";
import { Cookie } from "../../Cookie";
import { LANGUAGE_COOKIE_ID } from "infra/Language";
import { ICookieSetOptions } from "shell-core/src/core/declares/Cookie";
import { getTianyuShellInfraInstanceId } from "shell-core/src/core/initial/store-api/TianyushellInfraInterface";

export const SetLanguageAction = ActionFactor.makeActionCreator<ITianyuShellCoreState, string | AreaCode>()
    .withHandler(function* (action) {
        const language = typeof action.params === "string" ? action.params : parseAreaCode(action.params);
        const isLanguageSupport = yield* StoreUtils.Handler.doSelector(
            IsLanguageSuppprted(action.instanceId, language),
        );

        if (isLanguageSupport instanceof Missing || !isLanguageSupport) {
            return null;
        }

        const languageConfig = yield* StoreUtils.Handler.doSelectorWithThrow(
            TianyuShellInfraInterfaceExpose.getLanguageConfigures(getTianyuShellInfraInstanceId()),
        );

        // save language to local storage and valid date is 30 days
        const date = new Date(Date.now());
        const expires = new Date(date.setDate(date.getDate() + 30));
        const cookieOption: ICookieSetOptions = {
            expires: expires,
        };
        /* istanbul ignore if */
        if (languageConfig.domain) {
            cookieOption.domain = languageConfig.domain;
        }
        /* istanbul ignore if */
        if (languageConfig.path) {
            cookieOption.path = languageConfig.path;
        }
        Cookie.set(LANGUAGE_COOKIE_ID, language, cookieOption);

        return language;
    })
    .withReducer(function (state, language) {
        return StoreUtils.State.getNewState(state, ["language", "current"], language);
    });
