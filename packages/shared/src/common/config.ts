const PORT = "PORT";
const MONGO_URI = "MONGO_URI";
const RABBITMQ_URL = "RABBITMQ_URL";

const config = {
    PORT: process.env[PORT] || "3000",
    MONGO_URI: process.env[MONGO_URI] || "mongodb://localhost:27017/newsdb",
    RABBITMQ_URL:
        process.env[RABBITMQ_URL] || "amqp://guest:guest@localhost:5672",
};

export function getEnvVar<K extends keyof typeof config>(
    key: K,
): (typeof config)[K] {
    return config[key];
}
