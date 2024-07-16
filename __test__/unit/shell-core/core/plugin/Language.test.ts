/** @format */

import { IInstanceAction, Missing } from "@aitianyu.cn/tianyu-store";
import { Language } from "shell-core/src/core/plugin/Language";
import { TianyuShellCoreInterfaceExpose } from "shell-core/src/core/utils/CoreInterfaceExpose";
import { getStore } from "shell-core/src/core/utils/Store";
import * as InfraLanguage from "infra/Language";
import { AreaCode, parseAreaString } from "@aitianyu.cn/types";
import { LanguageParseException } from "shell-core/src/core/declares/Exception";
import { TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.Language", () => {
    it("set", async () => {
        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(
                TianyuShellCoreInterfaceExpose.language.action.set.info.fullName,
            );
        });

        await Language.set("");
    });

    describe("getLocalLanguage", () => {
        it("get missing", () => {
            jest.spyOn(InfraLanguage, "getLanguage").mockReturnValue("en_us");
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                expect(selector.selector).toEqual(TianyuShellCoreInterfaceExpose.language.select.get.info.fullName);
                return new Missing();
            });

            const language = Language.getLocalLanguage();
            expect(language).toEqual(AreaCode.en_US);
            expect(InfraLanguage.getLanguage).toHaveBeenCalled();
        });

        it("get from store", () => {
            jest.spyOn(InfraLanguage, "getLanguage").mockReturnValue("en_us");
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                expect(selector.selector).toEqual(TianyuShellCoreInterfaceExpose.language.select.get.info.fullName);
                return AreaCode.af_ZA;
            });

            const language = Language.getLocalLanguage();
            expect(language).toEqual(AreaCode.af_ZA);
            expect(InfraLanguage.getLanguage).not.toHaveBeenCalled();
        });
    });

    it("getDefaultLanguage", () => {
        expect(Language.getDefaultLanguage()).toEqual(parseAreaString(navigator.language.replace("-", "_")));
    });

    describe("parse", () => {
        it("parse with correct language string", () => {
            expect(Language.parse("zh_HK")).toEqual(AreaCode.zh_HK);
        });

        it("parse unknown language", () => {
            expect(() => {
                Language.parse("aa");
            }).toThrow(new LanguageParseException("aa"));
        });
    });

    describe("toString", () => {
        it("toString with given language", () => {
            jest.spyOn(Language, "getLocalLanguage");
            Language.toString(AreaCode.af_ZA);
            expect(Language.getLocalLanguage).not.toHaveBeenCalled();
        });

        it("toString from local language", () => {
            jest.spyOn(Language, "getLocalLanguage").mockReturnValue(AreaCode.en_US);
            expect(Language.toString().toLowerCase()).toEqual("en_us");
            expect(Language.getLocalLanguage).toHaveBeenCalled();
        });
    });

    it("parseAreaString", () => {
        expect(Language.parseAreaString("aa", true)).toEqual(AreaCode.unknown);
    });

    it("addLanguage", (done) => {
        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(
                TianyuShellCoreInterface.compatibility.action.addLanguage.info.fullName,
            );
            done();
        });

        Language.addLanguages("support", []);
    });
});
