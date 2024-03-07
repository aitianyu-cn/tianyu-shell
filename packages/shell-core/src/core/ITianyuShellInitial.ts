/**@format */

/** Tianyu Shell initial configuration template */
export interface ITianyuShellInitial {
    core?: {
        runtime?: {
            console?: boolean;
        };
        environment?: string;
        version?: string;
        plugin?: {
            globalize?: boolean;
        };
        sync?: {
            compatibility?: boolean;
            /**
             * For some browser cases, to provide a proxy supporting to avoid CORS policy issue
             *
             * IMPORTANT:
             *  remote actual base url is http://resource.aitianyu.cn/resources, please set the proxy to it
             */
            proxy?: string;
        };
    };
    runtime?: {
        globalCache?: boolean;
        globalStorage?: boolean;

        support?: {
            router?: boolean;
        };
    };
    ui?: {
        core?: {
            support?: boolean;
        };
        theme?: {
            DefaultColor?: number | string;
            DefaultTheme?: string;
            ThemeURL?: string;
        };
        background?: {
            color?: string;
        };
    };
}
