type NewsStatuses = "scraped" | "classified" | "success" | "failed";

export interface INews {
    articleId: string;
    source: string;
    url: string;
    originalUrl: string;
    topic: string;
    isArchievable: boolean;
    status: NewsStatuses;
    error?: string;
    failedAt?: Date;
    retryCount?: number;
    summary: {
        title: string;
        description?: string;
        imageUrl?: string;
        readingTimeSeconds?: number;
    };
    scraperConfigId: string; //ObjectId
    classification: {
        sentimentScore?: number;
    };
    publishedAt?: Date;
    scrapedAt: Date;
    processedAt?: Date;
}
