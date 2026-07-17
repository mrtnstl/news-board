import {
    IScraperConfig,
    IScraperLogs,
    ScrapedDataType,
    ScrapedField,
    ScrapedFieldAttribute,
    ScraperLogLevel,
    ScraperSourceType,
    ScraperType,
} from "@news-board/contracts";
import { Schema, Types, model } from "mongoose";

const configFieldSubschema = new Schema<ScrapedField>(
    {
        selector: { type: String, required: true },
        attribute: {
            type: String,
            enum: Object.values(ScrapedFieldAttribute),
            required: false,
        },
        fallback: { type: String, required: false },
    },
    { _id: false },
);
const rawFieldsSubschema = new Schema(
    {
        title: {
            type: configFieldSubschema,
            required: true,
        },
        imageURL: {
            type: configFieldSubschema,
            required: true,
        },
        publishedAt: {
            type: configFieldSubschema,
            required: true,
        },
        articleLink: {
            type: configFieldSubschema,
            required: true,
        },
        summary: {
            type: configFieldSubschema,
            required: true,
        },
    },
    { _id: false },
);
const scraperOptionsSubschema = new Schema(
    {
        url: { type: String, required: true },
        currentPage: {
            type: Number,
            required: true,
            default: 1,
        },
        maxPages: { type: Number, required: true, default: 1 },
        selectorToWaitFor: { type: String, required: true },
        elementsRoot: { type: String, required: true },
        rawFields: {
            type: rawFieldsSubschema,
            required: true,
        },
    },
    { _id: false },
);
const configSubschema = new Schema(
    {
        scrprType: {
            type: String,
            enum: Object.values(ScraperType),
            required: true,
        },
        dataType: {
            type: String,
            enum: Object.values(ScrapedDataType),
            required: true,
        },
        scrprOptions: {
            type: scraperOptionsSubschema,
            required: true,
        },
    },
    { _id: false },
);
export const scraperConfigSchema = new Schema<IScraperConfig>(
    {
        name: { type: String, required: true },
        isActive: { type: Boolean, required: true, default: false },
        type: {
            type: String,
            enum: Object.values(ScraperSourceType),
            required: true,
        },
        version: { type: Number, required: true, default: 1 },
        config: {
            type: configSubschema,
            required: true,
        },
        lastSyncedAt: { type: Date, required: true, default: Date.now },
        deletedAt: { type: Date, required: false },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export const ScraperConfig = model<IScraperConfig>(
    "ScraperConfig",
    scraperConfigSchema,
);

type IScraperLogsMongoOverwrite = Omit<IScraperLogs, "scraperConfigId"> & {
    scraperConfigId: Schema.Types.ObjectId;
};

const ScraperLogEntrySchema = new Schema(
    {
        timestamp: { type: Date, required: true },
        level: {
            type: String,
            enum: Object.values(ScraperLogLevel),
            required: true,
        },
        message: { type: String, required: true },
        articleUrl: { type: String, required: true },
        durationMs: { type: Number, required: true },
        error: { type: String, required: false },
    },
    {
        _id: false,
    },
);

export const scraperLogSchema = new Schema<IScraperLogsMongoOverwrite>(
    {
        scraperConfigId: {
            type: Schema.Types.ObjectId,
            ref: "ScraperConfig",
            required: true,
            get: (v: Schema.Types.ObjectId) => String(v),
            validate: {
                validator: (v) => Types.ObjectId.isValid(v),
                message: "scraperConfigId must be a valid ObjectId",
            },
        },
        bucketStart: { type: Date, required: true },
        bucketEnd: { type: Date, required: true },
        logs: {
            type: [ScraperLogEntrySchema],
            required: true,
            default: undefined,
        },
        count: { type: Number, required: true },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export const ScraperLog = model<IScraperLogsMongoOverwrite>(
    "ScraperLog",
    scraperLogSchema,
);
