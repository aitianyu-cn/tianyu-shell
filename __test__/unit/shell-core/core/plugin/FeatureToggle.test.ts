/**@format */

import { FeatureSource, IFeature } from "../../../../../packages/shell-core/src/core/declares/Features";
import { ITianyuShellInitial } from "../../../../../packages/shell-core/src/core/ITianyuShellInitial";
import { initialTianyuShell } from "../../../../../packages/shell-core/src/core/tianyuShell";

const config = require("../../../../config/env.json") as ITianyuShellInitial;
initialTianyuShell(config);

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.FeatureToggle", () => {
    const { FeatureToggle } = require("../../../../../packages/shell-core/src/core/plugin/FeatureToggle");

    it("test for global setting", () => {
        expect((window as any).tianyuShell?.core?.featureToggle).toBeDefined();
    });

    describe("addFeature", () => {
        it("add a new feature toggle - 1", () => {
            FeatureToggle.addFeature("TEST_FEATURE");
            expect(FeatureToggle.allFeatures()["TEST_FEATURE"]).toBeFalsy();
        });

        it("add a new feature toggle - 2", () => {
            FeatureToggle.addFeature("TEST_FEATURE_2");
            expect(FeatureToggle.allFeatures()["TEST_FEATURE_2"]).toBeDefined();
        });

        it("add a existing feature toggle", () => {
            FeatureToggle.addFeature("TEST_FEATURE_2");
            expect(Object.keys(FeatureToggle.allFeatures()).length).toEqual(2);
        });
    });

    it("addStoreFeatures", () => {
        const aFeatures: IFeature[] = [
            {
                name: "TEST_FEATURE",
                isActive: true,
                depFeature: [],
                defaultOn: false,
            },
            {
                name: "TEST_FEATURE_3",
                isActive: true,
                depFeature: ["TEST_FEATURE", "TEST_UNUSED_FEATURE"],
                defaultOn: false,
            },
            {
                name: "TEST_FEATURE_4",
                isActive: true,
                depFeature: ["TEST_FEATURE_2"],
                defaultOn: false,
            },
        ];

        FeatureToggle.addStoreFeatures(aFeatures);

        expect(Object.keys(FeatureToggle.allFeatures()).length).toEqual(4);
        expect(FeatureToggle.allFeatures()["TEST_FEATURE"]).toBeFalsy();
        expect(FeatureToggle.allFeatures()["TEST_FEATURE_3"]).toBeTruthy();
        expect(FeatureToggle.allFeatures()["TEST_FEATURE_4"]).toBeTruthy();

        expect((window as any).tianyuShell?.core?.featureToggle._dependentFeatures["TEST_FEATURE_3"]).toEqual([
            "TEST_FEATURE",
            "TEST_UNUSED_FEATURE",
        ]);
        expect((window as any).tianyuShell?.core?.featureToggle._dependentFeatures["TEST_FEATURE_4"]).toEqual(["TEST_FEATURE_2"]);
    });

    describe("enable", () => {
        it("feature toggle does not exist", () => {
            FeatureToggle.enable("TEST_NO_EXIST_FEATURE");
        });

        it("enable feature", () => {
            expect(FeatureToggle.allFeatures()["TEST_FEATURE"]).toBeFalsy();
            expect(FeatureToggle.allFeatures()["TEST_FEATURE_3"]).toBeTruthy();

            FeatureToggle.enable("TEST_FEATURE_3", true);

            expect(FeatureToggle.allFeatures()["TEST_FEATURE"]).toBeTruthy();
            expect(FeatureToggle.allFeatures()["TEST_FEATURE_3"]).toBeTruthy();
        });
    });

    describe("disable", () => {
        it("feature toggle does not exist", () => {
            FeatureToggle.disable("TEST_NO_EXIST_FEATURE");
        });

        it("disable feature", () => {
            expect(FeatureToggle.allFeatures()["TEST_FEATURE"]).toBeTruthy();
            expect(FeatureToggle.allFeatures()["TEST_FEATURE_3"]).toBeTruthy();

            FeatureToggle.disable("TEST_FEATURE", true);

            expect(FeatureToggle.allFeatures()["TEST_FEATURE"]).toBeFalsy();
            expect(FeatureToggle.allFeatures()["TEST_FEATURE_3"]).toBeFalsy();
        });
    });

    describe("isActive", () => {
        it("feature toggle does not exist", () => {
            expect(FeatureToggle.isActive("TEST_NO_EXIST_FEATURE")).toBeFalsy();
        });

        it("get feature is active", () => {
            expect(FeatureToggle.isActive("TEST_FEATURE_4")).toBeTruthy();
        });
    });

    it("contains", () => {
        expect(FeatureToggle.contains("TEST_FEATURE")).toBeTruthy();
        expect(FeatureToggle.contains("TEST_FEATURE_2")).toBeTruthy();
        expect(FeatureToggle.contains("TEST_FEATURE_3")).toBeTruthy();
        expect(FeatureToggle.contains("TEST_FEATURE_4")).toBeTruthy();
        expect(FeatureToggle.contains("TEST_FEATURE_5")).toBeFalsy();
    });

    it("loadFeatures", () => {
        // if ((window as any).tianyuShell?.core?.featureToggle) {
        //     (window as any).tianyuShell.core.featureToggle._features = {};
        //     (window as any).tianyuShell.core.featureToggle._dependentFeatures = {};
        // }

        const features: FeatureSource = require("./data/featureTestData.json");
        FeatureToggle.loadFeatures(features);

        expect(FeatureToggle.contains("AITIANYU_CN_HOME_EXPLORER")).toBeTruthy();
        expect(FeatureToggle.contains("AITIANYU_CN_WEB_DOCUMENT_SUPPORT")).toBeTruthy();
        expect(FeatureToggle.contains("AITIANYU_CN_WEB_DYNAMIC_PAGE_CACHE")).toBeTruthy();
        expect(FeatureToggle.contains("AITIANYU_CN_WEB_DYNAMIC_PAGE_OPTIMIZED")).toBeTruthy();
        expect(FeatureToggle.contains("AITIANYU_CN_WEB_DYNAMIC_PAGE_STATIC")).toBeTruthy();
        expect(FeatureToggle.contains("REACT_HORIZONTAL_NAVIGATION_MOB_AUTO_CLOSE")).toBeTruthy();
        expect(FeatureToggle.contains("REACT_HORIZONTAL_NAVIGATION_NARROW_HOVER_OPEN")).toBeTruthy();
        expect(FeatureToggle.contains("REACT_NAVIGATION_DEVELOPMENT")).toBeTruthy();
        expect(FeatureToggle.contains("REACT_NAVIGATION_PERFORMANCE_TOGGLE")).toBeTruthy();
        expect(FeatureToggle.contains("TIANYU_CN_BETA_INTERNAL_READY")).toBeTruthy();
        expect(FeatureToggle.contains("TIANYU_CN_BETA_USER_ON_LOAD_SUPPORT")).toBeTruthy();
        expect(FeatureToggle.contains("TIANYU_SHELL_CONSOLE_LOG")).toBeTruthy();

        expect(FeatureToggle.isActive("REACT_NAVIGATION_DEVELOPMENT")).toBeTruthy();
        expect(FeatureToggle.isActive("REACT_NAVIGATION_PERFORMANCE_TOGGLE")).toBeTruthy();
        expect(FeatureToggle.isActive("REACT_HORIZONTAL_NAVIGATION_MOB_AUTO_CLOSE")).toBeTruthy();
        expect(FeatureToggle.isActive("REACT_HORIZONTAL_NAVIGATION_NARROW_HOVER_OPEN")).toBeTruthy();
        expect(FeatureToggle.isActive("TIANYU_SHELL_CONSOLE_LOG")).toBeTruthy();

        expect(FeatureToggle.isActive("AITIANYU_CN_HOME_EXPLORER")).toBeFalsy();
        expect(FeatureToggle.isActive("AITIANYU_CN_WEB_DOCUMENT_SUPPORT")).toBeFalsy();

        expect(FeatureToggle.isActive("AITIANYU_CN_WEB_DYNAMIC_PAGE_CACHE")).toBeFalsy();
        expect(FeatureToggle.isActive("AITIANYU_CN_WEB_DYNAMIC_PAGE_STATIC")).toBeFalsy();
        expect(FeatureToggle.isActive("AITIANYU_CN_WEB_DYNAMIC_PAGE_OPTIMIZED")).toBeFalsy();

        expect(FeatureToggle.isActive("TIANYU_CN_BETA_INTERNAL_READY")).toBeFalsy();
        expect(FeatureToggle.isActive("TIANYU_CN_BETA_USER_ON_LOAD_SUPPORT")).toBeFalsy();
    });
});
