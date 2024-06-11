/** @format */

import { CreateStylingInstanceActionCreator } from "./StylingBaseActionCreator";

export const CreateStylingInstanceAction = CreateStylingInstanceActionCreator.withReducer(function (_state, initTheme) {
    return {
        css: [],
        theme: {
            user: {
                custom: {},
                using: [],
            },
            default: {
                ...initTheme.default,
            },
            custom: {
                ...initTheme.custom,
            },
        },
    };
});
