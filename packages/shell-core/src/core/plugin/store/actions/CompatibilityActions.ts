/** @format */

import { ActionFactor, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState } from "../State";
import { GetLanguageAsString, GetPendingLanguages, GetSupportLanguages } from "../selectors/LanguageSelector";
import { ArrayHelper } from "@aitianyu.cn/types";
import { SetLanguageAction } from "./LanguageActions";
import { TianyuShellLanguageRegisterType } from "shell-core/src/core/declares/Declare";

export const AddSupportLanguage = ActionFactor.makeActionCreator<ITianyuShellCoreState, string[]>()
    .withHandler(function* (action) {
        const supportLanguages = yield* StoreUtils.Handler.doSelectorWithThrow(GetSupportLanguages(action.instanceId));
        const pendingLanguages = yield* StoreUtils.Handler.doSelectorWithThrow(GetPendingLanguages(action.instanceId));

        // get supported languages and mergre data
        const newSupportLanguages = ArrayHelper.merge(supportLanguages, action.params);
        // process pending languages
        // to remove languages which are added in supported language list currently,
        // from old pending languages list
        const newPendingLanguages: string[] = [];
        const oldPendingLanguages = pendingLanguages;
        for (const lang of oldPendingLanguages) {
            !newSupportLanguages.includes(lang) && newPendingLanguages.push(lang);
        }

        return { support: newSupportLanguages, pending: newPendingLanguages };
    })
    .withReducer(function (state, language) {
        return StoreUtils.State.getNewState(state, ["compatibility", "language"], language);
    });

export const AddPendingLanguage = ActionFactor.makeActionCreator<ITianyuShellCoreState, string[]>()
    .withHandler(function* (action) {
        const supportLanguages = yield* StoreUtils.Handler.doSelectorWithThrow(GetSupportLanguages(action.instanceId));
        const pendingLanguages = yield* StoreUtils.Handler.doSelectorWithThrow(GetPendingLanguages(action.instanceId));

        // get pending languages and mergre data
        const newPendingLanguages = ArrayHelper.merge(pendingLanguages, action.params);
        // process supported languages
        // to remove languages which are added in pending language list currently,
        // from old supported languages list
        const newSupportLanguages: string[] = [];
        const oldSupportLanguages = supportLanguages;
        for (const lang of oldSupportLanguages) {
            !newPendingLanguages.includes(lang) && newSupportLanguages.push(lang);
        }

        // if the language of local setting is not supported in newest language setting
        // to set the local language to the first of support languages or get from default language.
        const localUsingLanguage = (yield* StoreUtils.Handler.doSelectorWithThrow(
            GetLanguageAsString(action.instanceId),
        )).replace("-", "_");
        if (newPendingLanguages.includes(localUsingLanguage)) {
            yield* StoreUtils.Handler.doAction(
                SetLanguageAction(
                    action.instanceId,
                    newSupportLanguages.length > 0 ? newSupportLanguages[0] : navigator.language.replace("-", "_"),
                ),
            );
        }

        return { support: newSupportLanguages, pending: newPendingLanguages };
    })
    .withReducer(function (state, language) {
        return StoreUtils.State.getNewState(state, ["compatibility", "language"], language);
    });

export const AddLanguageAction = ActionFactor.makeActionCreator<
    ITianyuShellCoreState,
    {
        type: TianyuShellLanguageRegisterType;
        languages: string[];
    }
>().withHandler(function* (action) {
    if (action.params.type === "support") {
        yield* StoreUtils.Handler.doAction(AddSupportLanguage(action.instanceId, action.params.languages));
    } else {
        yield* StoreUtils.Handler.doAction(AddPendingLanguage(action.instanceId, action.params.languages));
    }
});

export const AddThemesAction = ActionFactor.makeActionCreator<ITianyuShellCoreState, string[]>().withReducer(function (
    state,
    themes,
) {
    return StoreUtils.State.getNewState(
        state,
        ["compatibility", "theme"],
        ArrayHelper.merge(state.compatibility.theme, themes),
    );
});
