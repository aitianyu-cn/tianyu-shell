/** @format */

import { GetCurrentLayerIndex } from "shell-core/src/ui/plugin/interface/selector/DialogSelector";
import { IDialogState } from "shell-core/src/ui/plugin/interface/state/DialogState";

describe("aitianyu-cn.node-module.tianyu-shell.shell-core.ui.plugin.interface.DialogSelector", () => {
    describe("GetCurrentLayerIndex", () => {
        it("get index", () => {
            const state: IDialogState = {
                id: "",
                layers: ["t1", "t2"],
                current: "t2",
                dialogs: [],
            };

            expect(GetCurrentLayerIndex.getter(state)).toEqual(1);
        });
    });
});
