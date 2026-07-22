import express from "express";
import { getEnvVar } from "@news-board/shared/common/config";
import { shutdownRegistry } from "./events/gracefulShutdown.js";
import { subscribeRoutes } from "./routes/index.js";
import { mongodb } from "./internals/db/mongodb.js";

shutdownRegistry.grafeculShutdownListener();

const port = getEnvVar("PORT");

const app = express();
app.use(express.json());

subscribeRoutes(app);

const database = mongodb;
database
    .connect()
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.log);

const server = app.listen(port, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`API service listening on port ${port}`);
    shutdownRegistry.registerShutdownHook({
        value: (_signal) => {
            console.log(`Closing Express server`);
            server.close();
        },
        priority: 10,
    });
});
