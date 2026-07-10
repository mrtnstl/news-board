import { ErrorWithCause, ErrorsUtil } from "../../common/errors.js";

const { ConfigError, ScraperError } = ErrorsUtil.error;

let nestedError: ErrorWithCause;

describe("ErrorWithCause utility class", () => {
    beforeEach(() => {
        nestedError = new ErrorWithCause(
            "outer message",
            new ErrorWithCause(
                "intermediate message",
                new Error("inner message"),
            ),
        );
    });

    it("should return an object that is an instance of the class", () => {
        expect(nestedError).toBeInstanceOf(ErrorWithCause);
        expect(nestedError).toBeInstanceOf(Error);
    });

    it("unwrapCauses method should return a list of nested error messages", () => {
        const result = nestedError.unwrapCauses();

        expect(result.length).toBe(3);
        expect(Array.isArray(result)).toBe(true);
        expect(result.join(";")).toBe(
            "outer message;intermediate message;inner message",
        );
    });
    it("unwrapCauses method should return a list of nested error messages of length N, passed as argument", () => {
        const result = nestedError.unwrapCauses(2);

        expect(result.length).toBe(2);
        expect(Array.isArray(result)).toBe(true);
        expect(result.join(";")).toBe("outer message;intermediate message");
    });
    it("unwrapCauses method should return a list of all nested error messages, when passed a larger number as argument", () => {
        const result = nestedError.unwrapCauses(10);

        expect(result.length).toBe(3);
        expect(Array.isArray(result)).toBe(true);
        expect(result.join(";")).toBe(
            "outer message;intermediate message;inner message",
        );
    });
});

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
