/**@format */

import { getStore } from "shell-core/src/core/utils/Store";
import { registerInterface as initElementInfraForStore } from "./src/store/InterfaceInitor";
initElementInfraForStore(getStore());

export * from "./src/model/React";
export * from "./src/model/StoreInteface";

// export React basic definition
export { ReactElement } from "./src/ReactElement";
export { ReactLiteElement } from "./src/ReactLiteElement";
export { initElementInfraForStore };
