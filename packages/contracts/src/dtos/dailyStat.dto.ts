export interface IDailyStats {
    date: Date;
    discoveredArticlesByTopic: [
        {
            topic: string;
            count: number;
        },
    ];
    totalDiscovered: number;
    createdAt: Date;
    updatedAt: Date;
}
