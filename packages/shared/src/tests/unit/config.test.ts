import { getEnvVar } from "../../common/config.js";

describe("getEnvVar", () => {
    it("should return default value to 'key' in config object, when it's missing from process.env", () => {
        const expected = "3000";
        const result = getEnvVar("PORT");

        expect(expected).toBe(result);
    });
});
