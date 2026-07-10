import { registerShutdownHook } from "../../common/events.js";

registerShutdownHook(async (signal) => {
    console.log("closing mongodb", signal);
});
