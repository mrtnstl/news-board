/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageProvider: "v8",
    rootDir: process.cwd(),
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "mjs", "cjs", "json", "node"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
    preset: "ts-jest/presets/default-esm",
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                useESM: true,
                tsconfig: {
                    module: "esnext",
                },
            },
        ],
    },
};

export default config;
