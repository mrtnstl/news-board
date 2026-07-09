export class ErrorWithCause extends Error {
    constructor(message: string, cause: Error) {
        super(message, { cause: cause });
    }
    unwrapCauses(depth: number = 20): string[] {
        const results: string[] = [];
        let current: Error | undefined = this;

        while (current && results.length < depth) {
            results.push(current.message);

            if (!(current instanceof ErrorWithCause)) {
                break;
            }

            if (!(current.cause instanceof Error)) {
                break;
            }

            current = current.cause;
        }

        return results;
    }
}
