import z from "zod";
import {
    IScraperConfig,
    ScrapedDataType,
    ScrapedField,
    ScrapedFieldAttribute,
    ScraperSourceType,
    ScraperType,
} from "../dtos/scraperConfig.dto.js";
import { IScraperLogs, ScraperLogLevel } from "../dtos/scraperLogs.dto.js";

const ScrapedFieldAttributeSchema = new Set<keyof typeof ScrapedFieldAttribute>(
    [...Object.values(ScrapedFieldAttribute)],
);

const ScrapedFieldSchema = z.object({
    selector: z.string(),
    attribute: z.enum([...ScrapedFieldAttributeSchema]).optional(),
    fallback: z.string().optional(),
}) satisfies z.ZodType<ScrapedField>;

const ConfigTypeSchema = new Set<keyof typeof ScraperSourceType>([
    ...Object.values(ScraperSourceType),
]);
const ScraperTypeSchema = new Set<keyof typeof ScraperType>([
    ...Object.values(ScraperType),
]);
const ScrapedDataTypeSchema = new Set<keyof typeof ScrapedDataType>([
    ...Object.values(ScrapedDataType),
]);

export const ScraperConfigSchema = z.object({
    name: z.string(),
    isActive: z.boolean(),
    type: z.enum([...ConfigTypeSchema]),
    version: z.number(),
    config: z.object({
        scrprType: z.enum([...ScraperTypeSchema]),
        dataType: z.enum([...ScrapedDataTypeSchema]),
        scrprOptions: z.object({
            url: z.string(),
            currentPage: z.number(),
            maxPages: z.number(),
            selectorToWaitFor: z.string(),
            elementsRoot: z.string(),
            rawFields: z.object({
                title: ScrapedFieldSchema,
                imageURL: ScrapedFieldSchema,
                publishedAt: ScrapedFieldSchema,
                articleLink: ScrapedFieldSchema,
                summary: ScrapedFieldSchema,
            }),
        }),
    }),
    lastSyncedAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().optional(),
}) satisfies z.ZodType<IScraperConfig>;

const ScraperLogLevelSchema = new Set<keyof typeof ScraperLogLevel>([
    ...Object.values(ScraperLogLevel),
]);

export const ScraperLogSchema = z.object({
    scraperConfigId: z.string(), // ObjectId
    bucketStart: z.date(),
    bucketEnd: z.date(),
    logs: z.array(
        z.object({
            timestamp: z.date(),
            level: z.enum([...ScraperLogLevelSchema]),
            message: z.string(),
            articleUrl: z.string(),
            durationMs: z.number(),
            error: z.string().optional(),
        }),
    ),
    count: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
}) satisfies z.ZodType<IScraperLogs>;
