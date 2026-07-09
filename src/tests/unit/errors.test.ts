import { ErrorWithCause } from "../../common/errors.js";

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
