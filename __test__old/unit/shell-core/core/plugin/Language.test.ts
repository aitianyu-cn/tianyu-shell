/**@format */

import { AreaCode } from "@aitianyu.cn/types";
import { ITianyuShell } from "../../../../../packages/shell-core/src/core/declares/Declare";
import { LanguageParseException } from "../../../../../packages/shell-core/src/core/declares/Exception";
import { ITianyuShellInitial } from "../../../../../packages/shell-core/src/core/ITianyuShellInitial";
import { initialTianyuShell } from "../../../../../packages/shell-core/src/core/TianyuShell";

const AiTianyuTypes = require("@aitianyu.cn/types");

const config = require("../../../../config/env.json") as ITianyuShellInitial;
initialTianyuShell(config);

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.Language", () => {
    const { Language } = require("../../../../../packages/shell-core/src/core/plugin/Language");
    const { Cookie } = require("../../../../../packages/shell-core/src/core/plugin/Cookie");

    it("test for global setting", () => {
        expect(((window as any).tianyuShell as ITianyuShell).core.language).toBeDefined();

        const language = ((window as any).tianyuShell as ITianyuShell).core.language;
        expect(language.pendingLanguage.length).toEqual(0);

        expect(language.supportLanguage.includes("zh_CN")).toBeTruthy();
        expect(language.supportLanguage.includes("en_US")).toBeTruthy();
    });

    describe("language", () => {
        describe("set", () => {
            it("set language is not support", () => {
                jest.spyOn(Cookie, "set");
                Language.set("en_En");
                expect(Cookie.set).not.toHaveBeenCalled();
            });

            it("set language successful", () => {
                jest.spyOn(Cookie, "set");
                Language.set(AiTianyuTypes.AreaCode.zh_CN);
                expect(Cookie.set).toHaveBeenCalled();
            });
        });

        it("getLocalLanguage", () => {
            document.cookie = "LANGUAGE=zh_CN";
            expect(Language.getLocalLanguage()).toEqual(AiTianyuTypes.AreaCode.zh_CN);
        });

        it("getDefaultLanguage", () => {
            expect(() => {
                Language.getDefaultLanguage();
            }).not.toThrow();
        });

        describe("parse", () => {
            it("unknown language", () => {
                expect(() => {
                    Language.parse("en_TEST");
                }).toThrow(new LanguageParseException("en_TEST"));
            });

            it("parse successful", () => {
                const language = Language.parse("zh_CN");
                expect(language).toEqual(AiTianyuTypes.AreaCode.zh_CN);
            });
        });

        describe("toString", () => {
            it("get string from specified language string", () => {
                const language = Language.toString(AiTianyuTypes.AreaCode.en_US);
                expect(language).toEqual("en_US");
            });

            it("get string from local setting", () => {
                document.cookie = "LANGUAGE=zh_CN";
                const language = Language.toString();
                expect(language).toEqual("zh_CN");
            });
        });

        it("parseAreaString", () => {
            const areaCode = Language.parseAreaString("en_TEST", true);
            expect(areaCode).toEqual(AiTianyuTypes.AreaCode.unknown);
        });
    });

    describe("addLanguages", () => {
        it("support", () => {
            Language.addLanguages("support", ["zh_CN", "en_US", "zh_TW"]);

            const language = ((window as any).tianyuShell as ITianyuShell).core.language;
            expect(language.pendingLanguage.length).toEqual(0);

            expect(language.supportLanguage.includes("zh_CN")).toBeTruthy();
            expect(language.supportLanguage.includes("en_US")).toBeTruthy();
            expect(language.supportLanguage.includes("zh_TW")).toBeTruthy();
        });

        it("pending - 1", () => {
            jest.spyOn(Language, "set");
            Language.addLanguages("pending", ["zh_CN", "en_US"]);

            const language = ((window as any).tianyuShell as ITianyuShell).core.language;
            expect(language.supportLanguage.length).toEqual(1);
            expect(language.supportLanguage.includes("zh_TW")).toBeTruthy();

            expect(language.pendingLanguage.includes("zh_CN")).toBeTruthy();
            expect(language.pendingLanguage.includes("en_US")).toBeTruthy();

            expect(Language.set).toHaveBeenCalledWith(AreaCode.zh_TW);
        });

        it("pending - 1", () => {
            Language.addLanguages("pending", ["zh_TW"]);

            const language = ((window as any).tianyuShell as ITianyuShell).core.language;
            expect(language.supportLanguage.length).toEqual(0);

            expect(language.pendingLanguage.includes("zh_TW")).toBeTruthy();
            expect(language.pendingLanguage.includes("zh_CN")).toBeTruthy();
            expect(language.pendingLanguage.includes("en_US")).toBeTruthy();
        });
    });
});
