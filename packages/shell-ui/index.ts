/**@format */

// export common declarations
export * from "./src/common/Declaration";

// export ui models
export * from "./src/model/Component";
export * from "./src/model/widget/WaitingDialog";

// export widgets
import * as TianyuUIComponentImport from "./src/TianyuComponent";
import * as TianyuUIWidgetWaitingImport from "./src/widget/WaitingDialog";

export namespace UI {
    // tianyu ui basic componet
    export import Component = TianyuUIComponentImport.Component;

    // tianyu ui widget export
    export import WaitingDialog = TianyuUIWidgetWaitingImport.WaitingDialog;
}
