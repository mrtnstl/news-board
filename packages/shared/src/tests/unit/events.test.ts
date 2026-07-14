import { ShutdownEventRegistry } from "../../common/events.js";

describe("ShutdownEventRegistry", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("registers shutdown hooks and removes them through the cleanup function", () => {
        const registry = new ShutdownEventRegistry();
        const hook = jest.fn();

        const unregister = registry.registerShutdownHook(hook);

        expect(registry.shutdownHooks.has(hook)).toBe(true);

        unregister();

        expect(registry.shutdownHooks.has(hook)).toBe(false);
    });

    it("registers SIGINT and SIGTERM listeners for graceful shutdown", () => {
        const registry = new ShutdownEventRegistry();
        const onceSpy = jest.spyOn(process, "once");

        registry.grafeculShutdownListener(5);

        expect(onceSpy).toHaveBeenCalledWith("SIGINT", expect.any(Function));
        expect(onceSpy).toHaveBeenCalledWith("SIGTERM", expect.any(Function));
    });
});
