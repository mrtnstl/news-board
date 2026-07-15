type ScraperLogLevels = "info" | "warn" | "error" | "debug";
export interface IScraperLogs {
    scraperConfigId: string; // ObjectId
    bucketStart: Date;
    bucketEnd: Date;
    logs: [
        {
            timestamp: Date;
            level: ScraperLogLevels;
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
