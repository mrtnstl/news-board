type ScraperConfigOptions = {};
type ScraperSourceTypes = "rss" | "api" | "raw";

export interface IScraperConfig {
    name: string;
    isActive: boolean;
    type: ScraperSourceTypes;
    version: number; // for optimistic locking
    config: ScraperConfigOptions;
    lastSyncedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
