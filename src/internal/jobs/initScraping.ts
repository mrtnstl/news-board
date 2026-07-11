import {
    ScraperRepository,
    type TMalformedConfig,
} from "../../features/scraper/scraper.repository.js";
import { ScraperService } from "../../features/scraper/scraper.service.js";
import { ErrorsUtil } from "../../common/errors.js";
const { error } = ErrorsUtil;
const { ScraperError } = error;

// test job
export async function initScraping(results: any[]) {
    try {
        const scraperRepo = new ScraperRepository();
        const scraperService = new ScraperService(scraperRepo);

        const confs = await scraperService.getAvailableConfigs();

        for (const config of confs) {
            const conf = await scraperService.getConfig(config);

            if ("malformedConfig" in conf) {
                // TODO: handle malformed config issues
                console.log(
                    `malformed config (${(conf as TMalformedConfig).name})
                    ${(conf as TMalformedConfig).error}
                    ${(conf as TMalformedConfig).error.cause}`,
                );
                continue;
            }

            const result = await scraperService.runScraper(conf);

            results.push(...result);
        }
    } catch (err) {
        throw new ScraperError("Job: Failed to run scraper", true, {
            cause: err instanceof Error ? err : new Error(String(err)),
        });
    }
}
