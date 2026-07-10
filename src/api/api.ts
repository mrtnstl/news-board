import express from "express";
import { subscribeRoutes } from "./routes/index.js";
import { gracefulShutdownListener } from "../common/events.js";
import { config } from "../common/config.js";

const api = express();

subscribeRoutes(api);

api.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});

gracefulShutdownListener();
