/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { ITianyuShellCoreState } from "../State";
import { AreaCode, parseAreaCode, parseAreaString } from "@aitianyu.cn/types";
import { getLanguage } from "infra/Language";

export const IsLanguageSuppprted = SelectorFactor.makeParameterSelector<ITianyuShellCoreState, string, boolean>(
    function (state, language) {
        return state.compatibility.language.support.includes(language);
    },
);

export const GetLanguage = SelectorFactor.makeSelector<ITianyuShellCoreState, AreaCode>(function (state) {
    const storeLang = state.language.current;
    return storeLang === AreaCode.unknown ? parseAreaString(getLanguage()) : storeLang;
});

export const GetLanguageAsString = SelectorFactor.makeSelector<ITianyuShellCoreState, string>(function (state) {
    const storeLang = state.language.current;
    return storeLang === AreaCode.unknown ? getLanguage() : parseAreaCode(storeLang);
});

export const GetSupportLanguages = SelectorFactor.makeSelector<ITianyuShellCoreState, string[]>(function (state) {
    return state.compatibility.language.support.concat();
});

export const GetPendingLanguages = SelectorFactor.makeSelector<ITianyuShellCoreState, string[]>(function (state) {
    return state.compatibility.language.pending.concat();
});
