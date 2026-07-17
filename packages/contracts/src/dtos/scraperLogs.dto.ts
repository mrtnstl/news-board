export const ScraperLogLevel = {
    info: "info",
    warn: "warn",
    error: "error",
    debug: "debug",
} as const;

export interface IScraperLogs {
    scraperConfigId: string; // ObjectId
    bucketStart: Date;
    bucketEnd: Date;
    logs: [
        {
            timestamp: Date;
            level: keyof typeof ScraperLogLevel;
            message: string;
            articleUrl: string;
            durationMs: number;
            error?: string;
        },
    ];
    count: number;
    createdAt: Date;
    updatedAt: Date;
}
