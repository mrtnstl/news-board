import z from "zod";
import { INews, NewsStatus } from "../dtos/news.dto.js";

const NewsStatusSchema = new Set<keyof typeof NewsStatus>([
    ...Object.values(NewsStatus),
]);

export const NewsSchema = z.object({
    articleId: z.string(),
    source: z.string(),
    url: z.string(),
    originalUrl: z.string(),
    topic: z.string(),
    isArchievable: z.boolean(),
    status: z.enum([...NewsStatusSchema]),
    error: z.string().optional(),
    failedAt: z.date().optional(),
    retryCount: z.number().optional(),
    summary: z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
    }),
    scraperConfigId: z.string(), //ObjectId
    classification: z.object({
        sentimentScore: z.number().optional(),
        readingTimeSeconds: z.number().optional(),
    }),
    publishedAt: z.date().optional(),
    scrapedAt: z.date(),
    processedAt: z.date().optional(),
}) satisfies z.ZodType<INews>;
