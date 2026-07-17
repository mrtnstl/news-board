export const ScrapedFieldAttribute = {
    src: "src",
    srcset: "srcset",
    href: "href",
    datetime: "datetime",
} as const;

export type ScrapedField = {
    selector: string;
    attribute?: keyof typeof ScrapedFieldAttribute;
    fallback?: string;
};

export const ScraperType = {
    puppeteer: "puppeteer",
    playwright: "playwright",
} as const;
export const ScrapedDataType = {
    news: "news",
} as const;

type ScraperConfigOptions = {
    scrprType: keyof typeof ScraperType;
    dataType: keyof typeof ScrapedDataType;
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
