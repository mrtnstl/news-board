import { getConstant } from "../../common/constants.js";

describe("getConstant", () => {
    it("should return the value associated with function parameter 'key' from constants object", () => {
        const expected = "<%PAGE_NUM%>";
        const result = getConstant("URL_PAGE_NUMBER_TEMPL");

        expect(expected).toBe(result);
    });
});
