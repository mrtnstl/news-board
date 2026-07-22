import mongoose from "mongoose";
import { DatabaseConnection } from "./database.js";

export class MongoDBConnection implements DatabaseConnection {
    private static instance: boolean;
    private db: mongoose.Mongoose | undefined;
    constructor(
        private uri: string,
        private options: mongoose.ConnectOptions,
    ) {
        if (MongoDBConnection.instance) {
            return this;
        }
        MongoDBConnection.instance = true;
    }
    async connect(): Promise<void> {
        this.db = await mongoose.connect(this.uri, this.options);
    }
    getDB() {
        return this.db;
    }
    async disconnect(): Promise<void> {
        if (this.db) {
            await this.db.disconnect();
        }
    }
}
