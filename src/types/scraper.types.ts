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
