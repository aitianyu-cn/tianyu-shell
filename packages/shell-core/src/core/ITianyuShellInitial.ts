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
