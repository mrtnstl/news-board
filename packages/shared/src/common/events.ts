import { PriorityQueue, PriorityQueueValue } from "./heap.js";

export type ShutdownHook = (signal: NodeJS.Signals) => Promise<void> | void;

export class ShutdownEventRegistry {
    private static exists: boolean;
    shutdownHooks = new PriorityQueue<ShutdownHook>();
    constructor() {
        if (ShutdownEventRegistry.exists) {
            return this;
        }
        ShutdownEventRegistry.exists = true;
    }
    registerShutdownHook(hook: PriorityQueueValue<ShutdownHook>) {
        this.shutdownHooks.enqueue(hook);
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

            while (!this.shutdownHooks.isEmpty()) {
                const hook = this.shutdownHooks.dequeue()!;
                await hook.value(signal);
            }

            clearTimeout(shutdownTimeout);
            console.log("Graceful shutdown completed!");
            process.exit(0);
        };

        process.once("SIGINT", () => run("SIGINT"));
        process.once("SIGTERM", () => run("SIGTERM"));
    }
}
