/**@format */

import { initialTianyuShellAsync } from "shell";

const env = require("../config/env.json");

// async function init() {
//     await initialTianyuShellAsync(env);
// }

beforeAll(async () => {
    await initialTianyuShellAsync(env);
});
