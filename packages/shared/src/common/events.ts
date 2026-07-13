export type ShutdownHook = (signal: NodeJS.Signals) => Promise<void> | void;

export class ShutdownEventRegistry {
    private static exists: boolean;
    shutdownHooks = new Set<ShutdownHook>();
    constructor() {
        if (ShutdownEventRegistry.exists) {
            return this;
        }
        ShutdownEventRegistry.exists = true;
    }
    registerShutdownHook(hook: ShutdownHook) {
        this.shutdownHooks.add(hook);
        return () => this.shutdownHooks.delete(hook);
    }
    grafeculShutdownListener(timeoutMillis: number = 10_000) {
        const run = async (signal: NodeJS.Signals) => {
            const shutdownTimeout = setTimeout(() => {
                console.log(
                    "Graceful shutdown took too long! Terminating process...",
                );
                clearTimeout(shutdownTimeout);
                process.exit(1);
            }, timeoutMillis);

            for (const hook of [...this.shutdownHooks]) {
                await hook(signal);
            }

            clearTimeout(shutdownTimeout);
            console.log("Graceful shutdown completed!");
            process.exit(0);
        };

        process.once("SIGINT", () => run("SIGINT"));
        process.once("SIGTERM", () => run("SIGTERM"));
    }
}
