type ShutdownHook = (signal: NodeJS.Signals) => Promise<void> | void;

const shutdownHooks = new Set<ShutdownHook>();

export function registerShutdownHook(hook: ShutdownHook) {
    shutdownHooks.add(hook);
    return () => shutdownHooks.delete(hook);
}

export function gracefulShutdownListener() {
    const run = async (signal: NodeJS.Signals) => {
        const shutdownTimeout = setTimeout(() => {
            console.log(
                "Graceful shutdown took too long! Terminating process...",
            );
            clearTimeout(shutdownTimeout);
            process.exit(1);
        }, 10000);

        for (const hook of [...shutdownHooks]) {
            await hook(signal);
        }

        clearTimeout(shutdownTimeout);
        console.log("Graceful shutdown completed!");
        process.exit(0);
    };

    process.once("SIGINT", () => run("SIGINT"));
    process.once("SIGTERM", () => run("SIGTERM"));
}
