export interface IScraper<T> {
    init(url: string): Promise<void>;
    scrape(): Promise<T[]>;
    cleanup(): Promise<void>;
}

export type ScrapeField = {
    selector: string;
    attribute?: string;
    fallback?: string;
};

export type DataSourcesMap = {
    nytimes: string;
    bleepingcomputer: string;
};

// options type for puppeteer scraper
export type PuppeteerOptions<T> = {
    url: string;
    currentPage: number;
    maxPages: number;
    selectorToWaitFor?: string;
    elementsRoot: string;
    rawFields: Record<Exclude<keyof T, "index">, ScrapeField>;
};

export type ScraperOptions = PuppeteerOptions<unknown>;

// response type for news data themed scraper
export type TScraperNewsResponse = {
    index: string;
    title: string;
    imageURL: string;
    publishedAt: string;
    articleLink: string;
    summary: string;
};

export type TNYTimesResponse = TScraperNewsResponse;

export type TBleepingComputerResponse = TScraperNewsResponse;
