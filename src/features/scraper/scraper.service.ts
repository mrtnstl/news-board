import { createScraper } from "../../internal/scraper/scraper.js";
import type {
    IScraperRepository,
    TMalformedConfig,
} from "./scraper.repository.js";
import {
    NewsScraperConfigSchema,
    type TScraperConfig,
} from "./scraper.schemas.js";
import { ErrorsUtil } from "../../common/errors.js";
const { error } = ErrorsUtil;
const { ConfigError, ScraperError } = error;

export interface IScraperService {
    getAvailableConfigs(): Promise<string[]>;
    getConfig(name: string): Promise<TMalformedConfig | TScraperConfig>;
    runScraper(scraperConfig: TScraperConfig): Promise<unknown[]>;
    updateConfig(name: string, updatedConfig: TScraperConfig): Promise<void>;
    removeConfig(name: string): Promise<void>;
    createConfig(name: string, newConfig: TScraperConfig): Promise<void>;
}

export class ScraperService implements IScraperService {
    constructor(private scraperRepo: IScraperRepository) {}
    async getAvailableConfigs() {
        try {
            const configs = await this.scraperRepo.getAvailableConfigs();
            return configs;
        } catch (err) {
            if (err instanceof ConfigError) {
                throw err;
            }
            throw new ScraperError("Service: Failed to list configs", false, {
                cause: err instanceof Error ? err : new Error(String(err)),
            });
        }
    }
    async getConfig(name: string) {
        try {
            const config = await this.scraperRepo.getConfig(name);
            if ("malformedConfig" in config) {
                // handle malformed config
                return config;
            }
            return config;
        } catch (err) {
            if (err instanceof ConfigError) {
                throw err;
            }
            throw new ScraperError(
                `Service: Failed to retrieve config "${name}"`,
                false,
                {
                    cause: err instanceof Error ? err : new Error(String(err)),
                },
            );
        }
    }
    async runScraper(scraperConfig: TScraperConfig) {
        try {
            const scraper = createScraper(scraperConfig);
            await scraper.init();
            const result = await scraper.scrape();
            await scraper.cleanup();

            return result;
        } catch (err) {
            if (err instanceof ConfigError) {
                throw err;
            }
            throw new ScraperError("Service: Failed to run scraper", false, {
                cause: err instanceof Error ? err : new Error(String(err)),
            });
        }
    }
    async updateConfig(name: string, updatedConfig: TScraperConfig) {
        try {
            const validationResult =
                NewsScraperConfigSchema.safeParse(updatedConfig);
            if (!validationResult.success) {
                throw validationResult.error;
            }
            const stringifiedConfig = JSON.stringify(validationResult.data);
            await this.scraperRepo.updateConfig(name, stringifiedConfig);
        } catch (err) {
            if (err instanceof ConfigError) {
                throw err;
            }
            throw new ScraperError("Service: Failed to update config", false, {
                cause: err instanceof Error ? err : new Error(String(err)),
            });
        }
    }
    async removeConfig(name: string) {
        try {
            await this.scraperRepo.deleteConfig(name);
        } catch (err) {
            if (err instanceof ConfigError) {
                throw err;
            }
            throw new ScraperError("Service: Failed to delete config", false, {
                cause: err instanceof Error ? err : new Error(String(err)),
            });
        }
    }
    async createConfig(name: string, newConfig: TScraperConfig) {
        try {
            const validationResult =
                NewsScraperConfigSchema.safeParse(newConfig);
            if (!validationResult.success) {
                throw validationResult.error;
            }
            const stringifiedConfig = JSON.stringify(validationResult.data);
            await this.scraperRepo.addConfig(name, stringifiedConfig);
        } catch (err) {
            if (err instanceof ConfigError) {
                throw err;
            }
            throw new ScraperError(
                `Service: Failed to create config "${name}"`,
                false,
                {
                    cause: err instanceof Error ? err : new Error(String(err)),
                },
            );
        }
    }
}
