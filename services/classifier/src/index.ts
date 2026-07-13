import amqp from "amqplib";
import { QUEUE_NAMES } from "@news-board/contracts";
import { getEnvVar } from "@news-board/shared/common/config";

async function main() {
    const connection = await amqp.connect(getEnvVar("RABBITMQ_URL"));
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAMES.articleDiscovered, { durable: true });
    await channel.assertQueue(QUEUE_NAMES.articleClassified, { durable: true });

    channel.consume(QUEUE_NAMES.articleDiscovered, (message) => {
        if (!message) {
            return;
        }

        const payload = JSON.parse(message.content.toString());
        console.log("Classifier received event", payload);

        const result = {
            event: QUEUE_NAMES.articleClassified,
            articleId: payload.articleId,
            label: "tech",
            confidence: 0.91,
            classifiedAt: new Date().toISOString(),
        };

        channel.sendToQueue(
            QUEUE_NAMES.articleClassified,
            Buffer.from(JSON.stringify(result)),
            { persistent: true },
        );
        channel.ack(message);
    });

    console.log("Classifier service is waiting for messages");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
