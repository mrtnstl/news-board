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
    static util = {};
}
