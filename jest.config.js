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
    setupFilesAfterEnv: ["<rootDir>/__test__/env/setupTestsAfterEnv.ts"],
    resetMocks: true,
    clearMocks: true,
    resetModules: true,
    transform: {
        "message\\.properties$": "./__test__/config/i18nLoader.js",
    },
    moduleNameMapper: {
        "^shell$": "<rootDir>/packages/index.ts",
        "^shell-core/(.*)$": "<rootDir>/packages/shell-core/$1",
        "^shell-react/(.*)$": "<rootDir>/packages/shell-react/$1",
        "^shell-ui/(.*)$": "<rootDir>/packages/shell-ui/$1",
        "^infra/(.*)$": "<rootDir>/packages/infra/$1",
        "^test/(.*)$": "<rootDir>/__test__/$1",
    },
    testPathIgnorePatterns: ["<rootDir>/__test__old"],
    coveragePathIgnorePatterns: [
        "<rootDir>/packages/infra/resource/",
        "<rootDir>/packages/infra/index.ts",
        "<rootDir>/packages/infra/International.ts",
    ],
    // transformIgnorePatterns: ["<rootDir>/node_modules/$"],
};
