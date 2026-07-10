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

class AppError extends Error {
    public isOperational: boolean;
    constructor(
        name: string,
        message: string,
        isOperational: boolean,
        options?: ErrorOptions,
    ) {
        super(message, options);
        this.name = name;
        this.isOperational = isOperational;
    }
}

class ConfigError extends AppError {
    constructor(
        message: string,
        isOperational: boolean,
        options?: ErrorOptions,
    ) {
        super("ConfigError", message, isOperational, options);
    }
}

class ScraperError extends AppError {
    constructor(
        message: string,
        isOperational: boolean,
        options?: ErrorOptions,
    ) {
        super("ScraperError", message, isOperational, options);
    }
}

export class ErrorsUtil {
    static error = {
        ConfigError,
        ScraperError,
    };
    static util = {
        errorWithCause: ErrorWithCause,
    };
}
