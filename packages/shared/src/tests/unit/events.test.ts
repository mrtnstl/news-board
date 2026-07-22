import { ShutdownEventRegistry } from "../../common/events.js";

describe("ShutdownEventRegistry", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("registers shutdown hooks", () => {
        const registry = new ShutdownEventRegistry();
        const hook = { value: jest.fn(), priority: 0 };

        registry.registerShutdownHook(hook);
        const registered = registry.shutdownHooks.dequeue();

        expect(registered).toEqual(hook);
    });

    it("registers SIGINT and SIGTERM listeners for graceful shutdown", () => {
        const registry = new ShutdownEventRegistry();
        const onceSpy = jest.spyOn(process, "once");

        registry.grafeculShutdownListener(5);

        expect(onceSpy).toHaveBeenCalledWith("SIGINT", expect.any(Function));
        expect(onceSpy).toHaveBeenCalledWith("SIGTERM", expect.any(Function));
    });
});
