/** @format */

import { loadI18n } from "infra/resource/MessageLoader";

loadI18n().then(async () => {
    const { initialTianyuShellAsync } = await import("shell");
    initialTianyuShellAsync({
        core: {
            runtime: {
                console: true,
            },
            environment: "development",
            version: "1.1.1.1",
            plugin: {
                globalize: true,
            },
        },
        runtime: {
            globalCache: true,
            globalStorage: true,

            support: {
                router: false,
            },
        },
        ui: {
            core: {
                support: true,
            },
            theme: {},
        },
    });

    const { waitLoading } = await import("shell-core");
    await waitLoading();

    // const language = require("../../dist/lib/shell-core/src/core/plugin/Language");
    // const cookie = require("../../dist/lib/shell-core/src/core/plugin/Cookie");
    // const event = require("../../dist/lib/shell-core/src/core/plugin/Event");
    // const router = require("../../dist/lib/shell-core/src/core/plugin/Router");
    // const runtime = require("../../dist/lib/shell-core/src/core/plugin/Runtime");
    // const console = require("../../dist/lib/shell-core/src/core/plugin/Console");
    // const featureToggle = require("../../dist/lib/shell-core/src/core/plugin/FeatureToggle");
    // const shellCore = require("../../dist/lib/shell-core");

    // try {
    //     shellCore.Core.Plugin.Language.parse("abcde");
    // } catch (e) {
    //     shellCore.Core.Plugin.Log.log(e);
    // }
});
