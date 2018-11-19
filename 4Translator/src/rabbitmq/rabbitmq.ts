var amqp = require('amqplib/callback_api');

interface rabbitMessage {
    content: Buffer;
}

export function getFromRabbit(queueName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const connectURL = "amqp://hgounrgc:dP8MEKG-QdNujnTbDMaaaCQuRaouunIE@flamingo.rmq.cloudamqp.com/hgounrgc";
        const password = "dP8MEKG-QdNujnTbDMaaaCQuRaouunIE";
        amqp.connect(connectURL, function (err: Error, conn: any) {
            if (err) {
                reject(err);
            }
            conn.createChannel(function (err: Error, ch: any) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                ch.assertQueue(queueName, { durable: false });
                ch.prefetch(1);
                console.log(`Waiting for data from ${queueName}`);
                ch.consume(queueName, (message: rabbitMessage) => {
                    //TODO: Update rabbitMessage to actual object, content might be a buffer
                    resolve(message.content.toString('utf8'));
                    ch.ack(message);
                }, {noAck: false});
            });
        })
    })
}

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

export function sendToBank(queueName: string, message: string){
    return new Promise((resolve, reject) => {
        amqp.connect("amqp://datdb.cphbusiness.dk:5672", function (err: Error, conn: any) {
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
                //ch.sendToQueue(queueName, Buffer.from(message), { 'reply-to': "bingoboisReply" });
                ch.publish(queueName, '', Buffer.from(message), { replyTo: "bingoboisReply" });
                resolve(true);
            });
        });
    })
    
}

export function getFromBank(queueName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const connectURL = "amqp://datdb.cphbusiness.dk:5672";
        amqp.connect(connectURL, function (err: Error, conn: any) {
            if (err) {
                reject(err);
            }
            conn.createChannel(function (err: Error, ch: any) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                ch.assertQueue(queueName, { durable: false });
                ch.prefetch(1);
                console.log(`Waiting for data from ${queueName}`);
                ch.consume(queueName, (message: rabbitMessage) => {
                    //TODO: Update rabbitMessage to actual object, content might be a buffer
                    resolve(message.content.toString('utf8'));
                    ch.ack(message);
                }, {noAck: false});
            });
        })
    })
}