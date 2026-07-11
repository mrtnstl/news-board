import z from "zod";

// scrapable field params
const ScrapeFieldSchema = z.object({
    selector: z.string(),
    attribute: z.enum(["src", "srcset", "href", "datetime"]).optional(),
    fallback: z.string().optional(),
});

//
const NewsFieldsSchema = z.object({
    title: ScrapeFieldSchema,
    imageURL: ScrapeFieldSchema,
    publishedAt: ScrapeFieldSchema,
    articleLink: ScrapeFieldSchema,
    summary: ScrapeFieldSchema,
});

// base config schema
export const BaseScraperConfigSchema = z.looseObject({
    scrprType: z.enum(["puppeteer", "playwright"]),
    dataType: z.enum(["news", "weather"]),
});

export const NewsScraperConfigSchema = BaseScraperConfigSchema.extend({
    scrprOptions: z.object({
        url: z.string(),
        currentPage: z.number(),
        maxPages: z.number(),
        selectorToWaitFor: z.string(),
        elementsRoot: z.string(),
        rawFields: NewsFieldsSchema,
    }),
});

export type TNewsScraperConfig = z.infer<typeof NewsScraperConfigSchema>;

// future union type
export type TScraperConfig = z.infer<typeof NewsScraperConfigSchema>;
