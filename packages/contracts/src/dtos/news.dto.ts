export const NewsStatus = {
    scraped: "scraped",
    classified: "classified",
    success: "success",
    failed: "failed",
} as const;

// contract for mongodb and zod schemas
export interface INews {
    articleId: string;
    source: string;
    url: string;
    originalUrl: string;
    topic: string;
    isArchievable: boolean;
    status: keyof typeof NewsStatus;
    error?: string;
    failedAt?: Date;
    retryCount?: number;
    summary: {
        title: string;
        description?: string;
        imageUrl?: string;
    };
    scraperConfigId: string; //ObjectId
    classification: {
        sentimentScore?: number;
        readingTimeSeconds?: number;
    };
    publishedAt?: Date;
    scrapedAt: Date;
    processedAt?: Date;
}

export type UpdateNewsStatus = Partial<
    Pick<INews, "status" | "error" | "failedAt" | "retryCount">
>;

export type CreateNews = Pick<
    INews,
    | "articleId"
    | "source"
    | "url"
    | "originalUrl"
    | "topic"
    | "isArchievable"
    | "status"
    | "summary"
    | "scraperConfigId"
    | "publishedAt"
    | "scrapedAt"
> &
    UpdateNewsStatus;

export type UpdateNews = UpdateNewsStatus & UpdateNewsClassification;

export type UpdateNewsClassification = Pick<
    INews,
    "processedAt" | "classification"
>;
