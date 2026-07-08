export interface IScraper<T>{
    init(url: string): Promise<void>;
    scrape(): Promise<T[]>;
    cleanup(): Promise<void>;
}