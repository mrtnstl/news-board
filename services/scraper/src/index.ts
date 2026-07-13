import amqp from "amqplib";
import { QUEUE_NAMES } from "@news-board/contracts";
import { getEnvVar } from "@news-board/shared/common/config";

async function main() {
    const connection = await amqp.connect(getEnvVar("RABBITMQ_URL"));
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAMES.articleDiscovered, { durable: true });

    const payload = {
        event: QUEUE_NAMES.articleDiscovered,
        articleId: "article-001",
        source: "techcrunch",
        url: "https://example.com/article-001",
        discoveredAt: new Date().toISOString(),
    };

    channel.sendToQueue(
        QUEUE_NAMES.articleDiscovered,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true },
    );
    console.log("Scraper service published article.discovered event");

    setTimeout(() => {
        connection.close();
    }, 10000);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
