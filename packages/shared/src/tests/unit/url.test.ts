import { isValid, normalize } from "../../common/url.js";

describe("isValid func", () => {
    it("should return object with url and error property", () => {
        const url = "https://google.com";
        const validated = isValid(url);

        expect(validated).toHaveProperty("url");
        expect(validated).toHaveProperty("error");
    });

    it("should return object with url object and null error if valid", () => {
        const url = "https://google.com";
        const expected = new URL(url);
        const validated = isValid(url);

        expect(validated.url).toEqual(expected);
        expect(validated.error).toBe(null);
    });

    it("should return object with null url and error object if invalid", () => {
        const url = "ht//google.com";
        const validated = isValid(url);

        expect(validated.url).toBe(null);
        expect(validated.error).toBeInstanceOf(Error);
    });

    it("should return object with null url and 'invalid protocol in URL' error if protocol is invalid", () => {
        const url = "postgresql://user:password@address";
        const validated = isValid(url);

        expect(validated.url).toBe(null);
        expect(validated.error).toBeInstanceOf(Error);
        expect(validated.error!.message).toBe("invalid protocol in URL");
    });
});

describe("normalize func", () => {
    it("should return a stringified url", () => {
        const url = new URL("https://example.com");
        const expected = "https://example.com";
        const normalized = normalize(url);

        expect(normalized).toBe(expected);
    });

    it("should force https if protocol is plain http", () => {
        const url = new URL("http://example.com");
        const normalized = normalize(url);

        const result = new URL(normalized);

        expect(result.protocol).toBe("https:");
    });

    it("should remove fragment('#') from url", () => {
        const url = new URL("http://example.com#some-fragment");
        const normalized = normalize(url);

        const result = new URL(normalized);

        expect(result.hash).toBe("");
    });

    it("should remove whitespace before and after the url", () => {
        const url = new URL("      http://www.example.com   ");
        const normalized = normalize(url);

        expect(normalized.startsWith(" ")).toBe(false);
        expect(normalized.endsWith(" ")).toBe(false);
    });

    it("should arrange query parameters on alphabetical order", () => {
        const url = "https://example.com?b=2&a=1&c=3";
        const expexted = "https://example.com/?a=1&b=2&c=3";

        const normalized = normalize(new URL(url));

        expect(normalized).toBe(expexted);
    });
});
