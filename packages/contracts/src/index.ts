export const QUEUE_NAMES = {
    articleDiscovered: "article.discovered",
    articleClassified: "article.classified",
} as const;

export type ArticleDiscoveredEvent = {
    event: typeof QUEUE_NAMES.articleDiscovered;
    articleId: string;
    source: string;
    url: string;
    discoveredAt: string;
};

export type ArticleClassifiedEvent = {
    event: typeof QUEUE_NAMES.articleClassified;
    articleId: string;
    label: string;
    confidence: number;
    classifiedAt: string;
};

export type QueueMessage = ArticleDiscoveredEvent | ArticleClassifiedEvent;

export * from "./dtos/news.dto.js";
export * from "./dtos/archivedArticle.dto.js";
export * from "./dtos/dailyStat.dto.js";
export * from "./dtos/scraperConfig.dto.js";
export * from "./dtos/scraperLogs.dto.js";
