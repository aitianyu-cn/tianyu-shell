/** @format */

import { ITianyuShellInitial } from "shell";

(async () => {
    const { initialTianyuShellAsync } = await import("shell");
    const initial: ITianyuShellInitial = {
        core: {
            runtime: {
                console: true,
            },
            environment: "development",
            version: "1.1.1.1",
            plugin: {
                globalize: true,
            },
            sync: {
                compatibility: true,
                proxy: "/remote-resources",
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
    };

    await initialTianyuShellAsync(initial);

    const { loadingUI } = await import("shell-core");
    await loadingUI();

    const { Major } = await import("shell-core");

    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.backgroundColor = "red";
    Major.append(div);
})();
