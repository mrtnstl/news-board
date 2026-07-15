/*DailyStats {                // daily scraping result statistics
    _id ObjectId
    date ISODate
    discoveredArticlesByTopic [
        {
            topic String
            count Number
        }
    ]
    totalDiscovered Number
    createdAt ISODate
    updatedAt ISODate
}*/

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
