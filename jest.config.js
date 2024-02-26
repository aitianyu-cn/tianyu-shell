/**
 * @format
 * @type {import('ts-jest').JestConfigWithTsJest}
 * */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    reporters: [
        "default",
        [
            "./node_modules/jest-html-reporters",
            {
                pageTitle: "Tianyu Shell Unit Test",
                publicPath: "__test__/__report__/unit",
                includeFailureMsg: true,
                expand: true,
                filename: "test-report.html",
            },
        ],
    ],
    coverageDirectory: "__test__/__report__/coverage",
    setupFiles: [],
    resetMocks: true,
    clearMocks: true,
    transform: {
        "message\\.properties$": "./__test__/config/i18nLoader.js",
    },
    // transformIgnorePatterns: ["<rootDir>/node_modules/$"],
};
