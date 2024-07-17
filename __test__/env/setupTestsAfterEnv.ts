/**@format */

import { Log } from "@aitianyu.cn/types";
import { globalFeatureLoader } from "shell-core/src/core/initial/loader/GlobalFeatureLoader";
import { handlerLoader } from "shell-core/src/core/initial/loader/HandlerLoader";
import { storeAPILoader } from "shell-core/src/core/initial/loader/StoreAPILoader";
import { storeCoreLoader } from "shell-core/src/core/initial/loader/StoreInitial";
import { loadingTianyuShellUICore } from "shell-core/src/ui/plugin/CoreResolve";

const env = require("../config/env.json");

beforeAll(async () => {
    await storeCoreLoader();
    await storeAPILoader(env);
    await handlerLoader(env);
    await globalFeatureLoader(env);
    await loadingTianyuShellUICore();
});

beforeEach(() => {
    jest.spyOn(Log, "log").mockImplementation(() => undefined);
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
});
