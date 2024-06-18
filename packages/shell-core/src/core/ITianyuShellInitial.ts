/**@format */

/** Tianyu Shell initial configuration template */
export interface ITianyuShellInitial {
    /** Core config part */
    core?: {
        /** runtime control */
        runtime?: {
            /**
             * Runtime console configuration
             *
             * Set to TRUE to enable the console when runtime
             * Set to FALSE to only show Error and Fatal message
             */
            console?: boolean;
        };
        /**
         * Application running environment
         *
         * Accept value (no striction of char case): development | product
         */
        environment?: string;
        /** Application version */
        version?: string;
        /** Tianyu Shell plugin setting */
        plugin?: {
            /**
             * To enable the global plugin of Tianyu Shell basic components.
             *
             * Set to true, you can find TianyuShell plugin APIs globalized in window.tianyuShell
             * Set to false, some operations may not valid or you will get unstable behavior or result
             */
            globalize?: boolean;
        };
        /** Configuration for remote loading when Tianyu Shell initializing */
        sync?: {
            /**
             * Tianyu Shell Compatibility setting
             *
             * Set to true, you can get newest theme, language supporting or other changes from resources.aitianyu.cn
             * what is a public library to provide common resources.
             *
             * Set to false, the application can only use the configuration defined in the shell. You will not able to
             * get newest resources immediately until the next upgrade.
             *
             * IMPORTANT
             *  for styling files will always get from tianyu resources library.
             */
            compatibility?: boolean;
            /**
             * For some browser cases, to provide a proxy supporting to avoid CORS policy issue
             *
             * IMPORTANT:
             *  1. remote actual base url is https://resource.aitianyu.cn/resources, please set the proxy to it.
             *  2. this framework has enabled the resources loading from remote library to load styling and other data,
             *     please always set this item to avoid some CORS error.
             */
            proxy?: string;
        };
        /** Tianyu Shell Language Setting */
        language?: {
            /**
             * Set the local cookie saved domian
             *
             * If this item is not set, language cookie will only be saved in current domain directly.
             */
            domain?: string;
            /**
             * Set the local cookie saved path
             *
             * If this item is not set, language cookie will only be saved in default path "/" directly.
             */
            path?: string;
        };
    };
    /**
     * Runtime setting for non-core part
     *
     * This item is different with core/runtime, this configured some extend parts in Tianyu Shell that means
     * if you not enable this function, Tianyu Shell can still work correctly.
     */
    runtime?: {
        /**
         * Set the global cache is enabled or not.
         *
         * Set to TRUE, you can use the global cache center to save any data and to get it in this browser page.
         * you can get the API from tianyuShell.runtime.cache
         */
        globalCache?: boolean;
        /**
         * Set the global status storage is enabled or not.
         *
         * Set to TRUE, you can use the global status store to create data triggered application
         *
         * @virtual this function is not ready until now. please waiting for the future updates
         */
        globalStorage?: boolean;

        /** Extend Part supporting in Tianyu Shell */
        support?: {
            /**
             * To Set the router controller can be used in Tianyu Shell or not
             *
             * Set to TURE, the application url hash changed event will be handled by Tianyu Shell Router and you can register
             * the event to quickly reaction the event.
             *
             * Set to FALSE, Router controller in Tianyu Shell is not valid and an Error will be thrown if you try to use it.
             */
            router?: boolean;
        };
    };
    /** Tianyu Shell UI configure */
    ui?: {
        /** Tianyu Shell UI Core part configuration */
        core?: {
            /**
             * Set the Tianyu Shell UI is enabled or not
             *
             * Set to TRUE, to enable the Tianyu Shell UI and you can use Tianyu Shell UI API to render background, main content,
             * you also can post message and popup a dialog by Tianyu Shell API and you can use any UI framework to create you
             * application UI.
             *
             * Set to FALSE, Tianyu Shell UI is not valid.
             */
            support?: boolean;
        };
        /** Tianyu Shell UI Theme part configuration */
        theme?: {
            /**
             * Tianyu Shell Default Color setting
             *
             * Accept value: dark(0) | light(1)
             */
            DefaultColor?: number | string;
            /**
             * Tianyu Shell Default Theme setting
             *
             * The theme name please follow the guidance of Tianyu Shell UI, only guidance described theme can be supported.
             */
            DefaultTheme?: string;
            /**
             * Customized Theme remote link
             *
             * This is a customized setting for each application. You can defined a url to get your theme setting and to overwrite
             * default Tianyu Shell theme.
             */
            ThemeURL?: string;
            /**
             * Set the local cookie saved domian
             *
             * If this item is not set, theme cookie will only be saved in current domain directly.
             */
            domain?: string;
            /**
             * Set the local cookie saved path
             *
             * If this item is not set, theme cookie will only be saved in default path "/" directly.
             */
            path?: string;
        };
        /** Tianyu Shel UI default background setting */
        background?: {
            /**
             * Set a simple color background
             *
             * this color supports following:
             *  1. color name, like white, black, ...
             *  2. HEX color, like #ABCDEF11
             *  3. calculation, like var(--color_define)
             */
            color?: string;
        };
    };
}
