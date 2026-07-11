import fs from "node:fs/promises";
import {
    NewsScraperConfigSchema,
    type TScraperConfig,
} from "./scraper.schemas.js";
import { ErrorsUtil } from "../../common/errors.js";
const { error } = ErrorsUtil;
const { ConfigError } = error;

const SCRAPER_CONFIG_DIR = "./config/";

export type TMalformedConfig = {
    name: string;
    malformedConfig: string;
    error: Error;
};

export interface IScraperRepository {
    getConfig(name: string): Promise<TScraperConfig | TMalformedConfig>;
    getAvailableConfigs(): Promise<string[]>;
    updateConfig(name: string, updatedConfig: string): Promise<void>;
    deleteConfig(name: string): Promise<void>;
    addConfig(name: string, newConfig: string): Promise<void>;
}

export class ScraperRepository implements IScraperRepository {
    /**
     *
     * @param name the name of the config file
     * @returns the parsed and validated json config
     * @returns a string of the config, if parsing failed
     */
    async getConfig(name: string): Promise<TScraperConfig | TMalformedConfig> {
        try {
            const config = await fs.readFile(SCRAPER_CONFIG_DIR + name, {
                encoding: "utf-8",
            });
            try {
                const parsedConfig: Record<string, string> = JSON.parse(config);

                const validationResult =
                    NewsScraperConfigSchema.safeParse(parsedConfig);
                if (!validationResult.success) {
                    throw validationResult.error;
                }

                return validationResult.data;
            } catch (err) {
                return {
                    name: name,
                    malformedConfig: config,
                    error: new ConfigError(
                        "Repository: Malformed configuration file",
                        false,
                        {
                            cause:
                                err instanceof Error
                                    ? err
                                    : new Error(String(err)),
                        },
                    ),
                };
            }
        } catch (err) {
            throw new ConfigError(
                `Repository: Failed to retrieve config "${name}"`,
                true,
                {
                    cause: err instanceof Error ? err : new Error(String(err)),
                },
            );
        }
    }
    /**
     *
     * @returns the list of available config filenames
     */
    async getAvailableConfigs() {
        try {
            const list = await fs.readdir(SCRAPER_CONFIG_DIR, {
                withFileTypes: true,
            });
            return list.map((item) => item.name);
        } catch (err) {
            throw new ConfigError(
                "Repository: Failed to retrieve available configs",
                true,
                {
                    cause: err instanceof Error ? err : new Error(String(err)),
                },
            );
        }
    }
    /**
     *
     * @param name is the name of the file, whos content will be overwritten
     * @param updatedConfig is the new file content
     */
    async updateConfig(name: string, updatedConfig: string) {
        try {
            await fs.writeFile(SCRAPER_CONFIG_DIR + name, updatedConfig);
        } catch (err) {
            throw new ConfigError(
                `Repository: Failed to update config "${name}"`,
                true,
                {
                    cause: err instanceof Error ? err : new Error(String(err)),
                },
            );
        }
    }
    /**
     *
     * @param name is the name of the file to be deleted
     */
    async deleteConfig(name: string) {
        try {
            await fs.unlink(SCRAPER_CONFIG_DIR + name);
        } catch (err) {
            throw new ConfigError(
                `Repository: Failed to delete config "${name}"`,
                true,
                {
                    cause: err instanceof Error ? err : new Error(String(err)),
                },
            );
        }
    }
    /**
     *
     * @param name is the new config name
     * @param newConfig is the file content
     */
    async addConfig(name: string, newConfig: string) {
        try {
            await fs.writeFile(SCRAPER_CONFIG_DIR + name, newConfig);
        } catch (err) {
            throw new ConfigError(
                `Repository: Failed to create config "${name}"`,
                true,
                {
                    cause: err instanceof Error ? err : new Error(String(err)),
                },
            );
        }
    }
}
