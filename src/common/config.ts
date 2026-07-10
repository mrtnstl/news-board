export const PORT = "PORT";
export const MONGODB_URL = "mongodb://";

export const config = {
    PORT: process.env[PORT] || "3000",
    MONGODB_URL: process.env[MONGODB_URL],
};
