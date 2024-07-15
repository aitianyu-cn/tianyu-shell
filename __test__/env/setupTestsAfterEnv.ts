/**@format */

import { initialTianyuShellAsync } from "shell";

const env = require("../config/env.json");

beforeAll(async () => {
    await initialTianyuShellAsync(env);
});
