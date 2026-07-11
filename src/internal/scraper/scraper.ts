import type { TScraperConfig } from "../../features/scraper/scraper.schemas.js";
import { PuppeteerScraper } from "./puppeteer.js";

/**
 *
 * @param config is an validated object, parsed from a scraper config file
 * @returns an instance of a scraper based on the scrprType defined in the config file
 */
export function createScraper(config: TScraperConfig) {
    switch (config.scrprType) {
        case "puppeteer":
            return new PuppeteerScraper(config.scrprOptions);
        case "playwright":
            throw new Error("Playwright scraper is not implemented");
        default:
            throw new Error("Failed to instantiate scraper");
    }
}
