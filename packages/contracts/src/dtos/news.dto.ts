export const NewsStatus = {
    scraped: "scraped",
    classified: "classified",
    success: "success",
    failed: "failed",
} as const;

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
    | Pick<INews, "status">
    | Pick<INews, "status" | "error" | "failedAt" | "retryCount">
>;

// Pick but get property from one level deep nested objects
type DeepPickerL1<T, K1 extends keyof T, K2 extends keyof T[K1]> = {
    [P in K2]: T[K1][K2];
};

export type UpdateNewsWithClassification =
    | DeepPickerL1<INews, "classification", "sentimentScore">
    | DeepPickerL1<INews, "classification", "readingTimeSeconds">;

export type UpdateNewsProcessedAt = Pick<INews, "processedAt">;
