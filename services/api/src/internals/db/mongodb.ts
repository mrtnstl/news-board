import { getEnvVar, MongoDBConnection } from "@news-board/shared";
import { shutdownRegistry } from "../../events/gracefulShutdown.js";

export const mongodb = new MongoDBConnection(getEnvVar("MONGO_URI"), {});

shutdownRegistry.registerShutdownHook({
    value: async (_signal) => {
        console.log(`Closing database connection`);
        await mongodb.disconnect();
    },
    priority: 5,
});
