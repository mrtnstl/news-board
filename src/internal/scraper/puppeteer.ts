import puppeteer, { Page } from "puppeteer";
import { addExtra, type VanillaPuppeteer } from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import {
    type IScraper,
    type PuppeteerOptions,
    type ScrapeField,
} from "../../types/scraper.types.js";
import { PAGE_NUMBER_TEMPL } from "../../common/constants.js";
import { ErrorsUtil } from "../../common/errors.js";
const { error } = ErrorsUtil;
const { ScraperError } = error;

const pptr = addExtra(puppeteer);
pptr.use(StealthPlugin());

export class PuppeteerScraper<T> implements IScraper<T> {
    private browser:
        Awaited<ReturnType<VanillaPuppeteer["launch"]>> | undefined;
    private page: Page | undefined;
    data: T[];
    private options: PuppeteerOptions<T>;

    constructor(options: PuppeteerOptions<T>) {
        this.data = [];
        this.options = options;
    }

    async init() {
        try {
            this.browser = await pptr.launch({
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });

            this.page = await this.browser.newPage();
            await this.page.setViewport({ width: 1920, height: 1080 });
        } catch (err: unknown) {
            throw new ScraperError("Scraper: Failed to init browser", true, {
                cause: err instanceof Error ? err : new Error(String(err)),
            });
        }
    }
    async scrape(): Promise<T[]> {
        try {
            if (!this.page) {
                throw new Error(
                    "Data retrieval can not proceed due to failed initialization",
                );
            }
            if (
                this.options?.rawFields == undefined ||
                Object.keys(this.options.rawFields).length < 1
            ) {
                throw new Error("Invalid options for scraper rawFields");
            }

            while (this.options.currentPage <= this.options.maxPages) {
                let url: string;
                if (this.options.url.includes(PAGE_NUMBER_TEMPL)) {
                    url = this.options.url.replace(
                        PAGE_NUMBER_TEMPL,
                        String(this.options.currentPage),
                    );
                } else {
                    url = this.options.url;
                }

                const response = await this.page.goto(url, {
                    waitUntil: "domcontentloaded",
                    timeout: 30000,
                });

                if (!response) {
                    throw new Error("Navigation failed: no response received");
                }
                if (response.status() >= 300) {
                    throw new Error("Response status code was not 2xx");
                }

                if (this.options.selectorToWaitFor) {
                    await this.page.waitForSelector(
                        this.options.selectorToWaitFor,
                        {
                            timeout: 30000,
                        },
                    );
                }

                const rawProducts = await this.page.evaluate(
                    (root, fieldDefinitions) => {
                        const items = document.querySelectorAll(root);

                        return Array.from(items).map((container, index) => {
                            const result: Record<string, string> = {
                                index: `${index}`,
                            };

                            for (const [
                                fieldName,
                                definition,
                            ] of Object.entries(fieldDefinitions)) {
                                const element = container.querySelector(
                                    definition.selector,
                                );

                                if (definition.attribute) {
                                    result[fieldName] =
                                        element
                                            ?.getAttribute(definition.attribute)
                                            ?.trim() ||
                                        definition.fallback ||
                                        "";
                                } else {
                                    result[fieldName] =
                                        element?.textContent?.trim() ||
                                        definition.fallback ||
                                        "";
                                }
                            }

                            return result;
                        });
                    },
                    this.options.elementsRoot,
                    this.options.rawFields as Record<string, ScrapeField>,
                );

                this.data.push(...(rawProducts as T[]));

                this.options.currentPage++;
            }

            return this.data;
        } catch (err: unknown) {
            throw new ScraperError("Scraper: Failed to scrape source", true, {
                cause: err instanceof Error ? err : new Error(String(err)),
            });
        }
    }
    async cleanup() {
        if (this.browser) {
            await this.browser.close();
        }
        this.data = [];
    }
}
