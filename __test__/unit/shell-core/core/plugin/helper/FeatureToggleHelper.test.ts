/** @format */

import { FeatureSource } from "shell-core/src/core/declares/Features";
import { processToggleState } from "shell-core/src/core/plugin/helper/FeatureToggleHelper";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.helper.FeatureToggleHelper", () => {
    describe("processToggleState", () => {
        it("- process", () => {
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
                FEATURE_4: {
                    description: "",
                    defaultOn: false,
                    version: "",
                    reqId: "",
                    depFeature: ["FEATURE_2"],
                },
            };

            expect(processToggleState(features, "FEATURE_1")).toBeFalsy();
            expect(processToggleState(features, "FEATURE_2")).toBeTruthy();
            expect(processToggleState(features, "FEATURE_3")).toBeFalsy();
            expect(processToggleState(features, "FEATURE_4")).toBeFalsy();
        });
    });
});
