/**@format */

import { initialTianyuShellAsync } from "shell";

const env = require("../config/env.json");

beforeAll(async () => {
    console.log("start initializing");
    await initialTianyuShellAsync(env);
});
