/** @format */

import { IInstanceAction, Missing } from "@aitianyu.cn/tianyu-store";
import { FeatureSource, IFeature } from "shell-core/src/core/declares/Features";
import { FeatureToggleImpl } from "shell-core/src/core/plugin/impl/FeatureToggleImpl";
import { TianyuShellCoreInterface } from "shell-core/src/core/plugin/store/Exports";
import { getStore } from "shell-core/src/core/utils/Store";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.impl.FeatureToggleImpl", () => {
    it("addFeature", (done) => {
        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(
                TianyuShellCoreInterface.featureToggle.action.add.info.fullName,
            );
            expect((action as IInstanceAction).params).toEqual({
                features: {
                    TEST_FEATURE: false,
                },
                dependencies: {
                    TEST_FEATURE: [],
                },
            });
            done();
        });

        FeatureToggleImpl.addFeature("TEST_FEATURE");
    });

    it("addStoreFeatures", (done) => {
        const features: IFeature[] = [
            {
                name: "FEATURE_1",
                isActive: false,
                depFeature: [],
                defaultOn: false,
            },
            {
                name: "FEATURE_2",
                isActive: true,
                depFeature: ["FEATURE_1"],
                defaultOn: false,
            },
        ];

        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(
                TianyuShellCoreInterface.featureToggle.action.add.info.fullName,
            );
            expect((action as IInstanceAction).params).toEqual({
                features: {
                    FEATURE_1: false,
                    FEATURE_2: true,
                },
                dependencies: {
                    FEATURE_1: [],
                    FEATURE_2: ["FEATURE_1"],
                },
            });
            done();
        });

        FeatureToggleImpl.addStoreFeatures(features);
    });

    describe("allFeatures", () => {
        it("get missing", () => {
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                expect(selector.selector).toEqual(
                    TianyuShellCoreInterface.featureToggle.select.allFeature.info.fullName,
                );
                return new Missing();
            });

            expect(FeatureToggleImpl.allFeatures()).toEqual({});
        });

        it("get success", () => {
            const features = {
                FEATURE: true,
                FEATURE_1: false,
            };
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                expect(selector.selector).toEqual(
                    TianyuShellCoreInterface.featureToggle.select.allFeature.info.fullName,
                );
                return features;
            });

            expect(FeatureToggleImpl.allFeatures()).toEqual(features);
        });
    });

    describe("enable", () => {
        it("with dep", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(
                    TianyuShellCoreInterface.featureToggle.action.enable.info.fullName,
                );
                expect((action as IInstanceAction).params).toEqual({
                    featureName: "TEST_FEATURE",
                    enableDepFeatures: true,
                });
                done();
            });

            FeatureToggleImpl.enable("TEST_FEATURE", true);
        });

        it("without dep", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(
                    TianyuShellCoreInterface.featureToggle.action.enable.info.fullName,
                );
                expect((action as IInstanceAction).params).toEqual({
                    featureName: "TEST_FEATURE",
                    enableDepFeatures: false,
                });
                done();
            });

            FeatureToggleImpl.enable("TEST_FEATURE");
        });
    });

    describe("disable", () => {
        it("with dep", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(
                    TianyuShellCoreInterface.featureToggle.action.disable.info.fullName,
                );
                expect((action as IInstanceAction).params).toEqual({
                    featureName: "TEST_FEATURE",
                    disableDepFeatures: true,
                });
                done();
            });

            FeatureToggleImpl.disable("TEST_FEATURE", true);
        });

        it("without dep", (done) => {
            jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
                expect((action as IInstanceAction).action).toEqual(
                    TianyuShellCoreInterface.featureToggle.action.disable.info.fullName,
                );
                expect((action as IInstanceAction).params).toEqual({
                    featureName: "TEST_FEATURE",
                    disableDepFeatures: false,
                });
                done();
            });

            FeatureToggleImpl.disable("TEST_FEATURE");
        });
    });

    describe("isActive", () => {
        it("get missing", () => {
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                expect(selector.selector).toEqual(TianyuShellCoreInterface.featureToggle.select.isActive.info.fullName);
                expect(selector.params).toEqual("TEST_FEATURE");
                return new Missing();
            });

            expect(FeatureToggleImpl.isActive("TEST_FEATURE")).toBeFalsy();
        });

        it("get success", () => {
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                expect(selector.selector).toEqual(TianyuShellCoreInterface.featureToggle.select.isActive.info.fullName);
                expect(selector.params).toEqual("TEST_FEATURE");
                return true;
            });

            expect(FeatureToggleImpl.isActive("TEST_FEATURE")).toBeTruthy();
        });
    });

    describe("contains", () => {
        it("get missing", () => {
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                expect(selector.selector).toEqual(TianyuShellCoreInterface.featureToggle.select.contains.info.fullName);
                expect(selector.params).toEqual("TEST_FEATURE");
                return new Missing();
            });

            expect(FeatureToggleImpl.contains("TEST_FEATURE")).toBeFalsy();
        });

        it("get success", () => {
            jest.spyOn(getStore(), "selecte").mockImplementation((selector) => {
                expect(selector.selector).toEqual(TianyuShellCoreInterface.featureToggle.select.contains.info.fullName);
                expect(selector.params).toEqual("TEST_FEATURE");
                return true;
            });

            expect(FeatureToggleImpl.contains("TEST_FEATURE")).toBeTruthy();
        });
    });

    it("loadFeatures", (done) => {
        const features: FeatureSource = {
            FEATURE_1: {
                description: "",
                defaultOn: false,
                version: "",
                reqId: "",
                depFeature: [],
            },
            FEATURE_2: {
                description: "",
                defaultOn: true,
                version: "",
                reqId: "",
                depFeature: [],
            },
            FEATURE_3: {
                description: "",
                defaultOn: true,
                version: "",
                reqId: "",
                depFeature: ["FEATURE_1"],
            },
        };

        jest.spyOn(getStore(), "dispatch").mockImplementation(async (action) => {
            expect((action as IInstanceAction).action).toEqual(
                TianyuShellCoreInterface.featureToggle.action.add.info.fullName,
            );
            expect((action as IInstanceAction).params).toEqual({
                features: {
                    FEATURE_1: false,
                    FEATURE_2: true,
                    FEATURE_3: false,
                },
                dependencies: {
                    FEATURE_1: [],
                    FEATURE_2: [],
                    FEATURE_3: ["FEATURE_1"],
                },
            });
            done();
        });

        FeatureToggleImpl.loadFeatures(features);
    });
});
