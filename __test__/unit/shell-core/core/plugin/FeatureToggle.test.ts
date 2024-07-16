/** @format */

import { FeatureToggle } from "shell-core/src/core/plugin/FeatureToggle";
import { FeatureToggleImpl } from "shell-core/src/core/plugin/impl/FeatureToggleImpl";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.core.plugin.FeatureToggle", () => {
    it("addFeature", () => {
        jest.spyOn(FeatureToggleImpl, "addFeature").mockImplementation();
        FeatureToggle.addFeature("");
        expect(FeatureToggleImpl.addFeature).toHaveBeenCalled();
    });

    it("addStoreFeatures", () => {
        jest.spyOn(FeatureToggleImpl, "addStoreFeatures").mockImplementation();
        FeatureToggle.addStoreFeatures([]);
        expect(FeatureToggleImpl.addStoreFeatures).toHaveBeenCalled();
    });

    it("allFeatures", () => {
        jest.spyOn(FeatureToggleImpl, "allFeatures").mockImplementation();
        FeatureToggle.allFeatures();
        expect(FeatureToggleImpl.allFeatures).toHaveBeenCalled();
    });

    it("enable", () => {
        jest.spyOn(FeatureToggleImpl, "enable").mockImplementation();
        FeatureToggle.enable("");
        expect(FeatureToggleImpl.enable).toHaveBeenCalled();
    });

    it("disable", () => {
        jest.spyOn(FeatureToggleImpl, "disable").mockImplementation();
        FeatureToggle.disable("");
        expect(FeatureToggleImpl.disable).toHaveBeenCalled();
    });

    it("isActive", () => {
        jest.spyOn(FeatureToggleImpl, "isActive").mockImplementation();
        FeatureToggle.isActive("");
        expect(FeatureToggleImpl.isActive).toHaveBeenCalled();
    });

    it("contains", () => {
        jest.spyOn(FeatureToggleImpl, "contains").mockImplementation();
        FeatureToggle.contains("");
        expect(FeatureToggleImpl.contains).toHaveBeenCalled();
    });

    it("loadFeatures", () => {
        jest.spyOn(FeatureToggleImpl, "loadFeatures").mockImplementation();
        FeatureToggle.loadFeatures({});
        expect(FeatureToggleImpl.loadFeatures).toHaveBeenCalled();
    });
});
