import express from "express";
import { getEnvVar } from "@news-board/shared/common/config";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "api" });
});

app.get("/news", (_req, res) => {
    res.json({ items: [] });
});

const port = getEnvVar("PORT");
app.listen(port, () => {
    console.log(`API service listening on port ${port}`);
});
