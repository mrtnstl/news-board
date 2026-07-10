import type { Express } from "express";

export function subscribeRoutes(app: Express) {
    app.get("/health", (_req, res, _next) => {
        return res.status(200).json({ message: "hello" });
    });
}
