const amqp = require("amqplib/callback_api");

export function sendToRabbit(message: string, queueName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const connectURL = "amqp://hgounrgc:dP8MEKG-QdNujnTbDMaaaCQuRaouunIE@flamingo.rmq.cloudamqp.com/hgounrgc";
        const password = "dP8MEKG-QdNujnTbDMaaaCQuRaouunIE";
        amqp.connect(connectURL, function (err: Error, conn: any) {
            if (err) {
                reject(err);
                return;
            }
            conn.createChannel(function (err: Error, ch: any) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                console.log(`[rabbitPublisher.sendToRabbit] Sending to ${queueName} the data: ${message}`)
                ch.assertQueue(queueName, { durable: false });
                ch.sendToQueue(queueName, Buffer.from(message));
                resolve(true);
            });
        });
    })
}
