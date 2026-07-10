import z from "zod";

export const ScraperConfigSchema = z.object(
    {
        scrprType: z.enum(["puppeteer", "playwright"]),
        dataType: z.enum(["news", "weather"]),
        scrprOptions: z.object({
            url: z.string(),
            currentPage: z.number(),
            maxPages: z.number(),
            selectorToWaitFor: z.string(),
            elementsRoot: z.string(),
            rawFields: z.looseObject({}),
        }),
    },
    "",
);

export type TScraperConfig = z.infer<typeof ScraperConfigSchema>;
