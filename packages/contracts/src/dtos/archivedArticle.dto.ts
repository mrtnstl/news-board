type ArchivalReasons = "too_old" | "low_quality" | "manual";

export interface IArchivedArticles {
    articleId: string;
    url: string;
    reason: ArchivalReasons;
    archivedAt: Date;
}
