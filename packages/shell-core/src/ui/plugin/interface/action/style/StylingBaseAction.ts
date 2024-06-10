/** @format */

import { CreateStylingInstanceActionCreator, DestroyStylingInstanceActionCreator } from "./StylingBaseActionCreator";

export const CreateStylingInstanceAction = CreateStylingInstanceActionCreator.withReducer(function (_state) {
    return {
        css: [],
        theme: {
            user: {
                custom: {},
                using: [],
            },
            default: {
                valid: false,
                theme: "",
                color: "light",
            },
            custom: {
                valid: false,
                theme: "",
                color: "light",
            },
        },
    };
});
