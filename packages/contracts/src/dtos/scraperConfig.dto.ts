type ScrapedField = {
    selector: string;
    attribute?: "src" | "srcset" | "href" | "datetime";
    fallback?: string;
};

type ScraperConfigOptions = {
    scrprType: "puppeteer" | "playwright";
    dataType: "news" | "weather";
    scrprOptions: {
        url: string;
        currentPage: number;
        maxPages: number;
        selectorToWaitFor: string;
        elementsRoot: string;
        rawFields: {
            title: ScrapedField;
            imageURL: ScrapedField;
            publishedAt: ScrapedField;
            articleLink: ScrapedField;
            summary: ScrapedField;
        };
    };
};

export const ScraperSourceType = {
    rss: "rss",
    api: "api",
    raw: "raw",
} as const;

export interface IScraperConfig {
    name: string;
    isActive: boolean;
    type: keyof typeof ScraperSourceType;
    version: number; // for optimistic locking
    config: ScraperConfigOptions;
    lastSyncedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
