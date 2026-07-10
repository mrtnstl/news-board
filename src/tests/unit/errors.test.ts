import { ErrorsUtil } from "../../common/errors.js";

const { ConfigError, ScraperError } = ErrorsUtil.error;

describe("App error classes", () => {
    it("should create a ConfigError with the expected name and metadata", () => {
        const cause = new Error("root cause");
        const error = new ConfigError("invalid config", true, { cause });

        expect(error).toBeInstanceOf(ConfigError);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe("ConfigError");
        expect(error.message).toBe("invalid config");
        expect(error.isOperational).toBe(true);
        expect(error.cause).toBe(cause);
    });

    it("should create a ScraperError with the expected name and metadata", () => {
        const cause = new Error("scraper failure");
        const error = new ScraperError("scrape failed", false, { cause });

        expect(error).toBeInstanceOf(ScraperError);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe("ScraperError");
        expect(error.message).toBe("scrape failed");
        expect(error.isOperational).toBe(false);
        expect(error.cause).toBe(cause);
    });
});
