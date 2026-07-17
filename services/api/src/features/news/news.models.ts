import mongoose, { Schema, model } from "mongoose";
import { INews, NewsStatus } from "@news-board/contracts/dtos/news.dto";

// overwritten type to decouple application layer News interface from persistence level schema
// type of scraperConfigId in app must be string
// type of scraperConfigId in database must be ObjectId
type INewsMongoOverwrite = Omit<INews, "scraperConfigId"> & {
    scraperConfigId: Schema.Types.ObjectId;
};

const summarySubSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        imageUrl: { type: String, required: false },
    },
    { _id: false },
);
const classificationSubSchema = new Schema(
    {
        sentimentScore: { type: Number, required: false },
        readingTimeSeconds: { type: Number, required: false },
    },
    { _id: false },
);

const newsSchema = new Schema<INewsMongoOverwrite>(
    {
        articleId: { type: String, required: true, unique: true },
        source: { type: String, required: true, trim: true },
        url: { type: String, required: true },
        originalUrl: { type: String, required: true },
        topic: { type: String, required: true },
        isArchievable: { type: Boolean, default: true, required: true },
        status: {
            type: String,
            enum: Object.values(NewsStatus),
            required: true,
        },
        error: { type: String, required: false },
        failedAt: { type: Date, required: false },
        retryCount: { type: Number, required: false },
        summary: {
            type: summarySubSchema,
            required: true,
        },
        scraperConfigId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ScraperConfig",
            required: true,
            get: (v: Schema.Types.ObjectId) => String(v),
            validate: {
                validator: (v) => mongoose.Types.ObjectId.isValid(v),
                message: "scraperConfigId must be a valid ObjectId",
            },
        },
        classification: {
            type: classificationSubSchema,
            required: true,
        },
        publishedAt: { type: Date, required: false },
        processedAt: { type: Date, required: false },
        scrapedAt: { type: Date, required: true },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export const News = model<INewsMongoOverwrite>("News", newsSchema);
