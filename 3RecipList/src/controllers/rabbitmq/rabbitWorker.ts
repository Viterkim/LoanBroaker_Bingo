import { resolve } from "dns";

var amqp = require('amqplib/callback_api');

interface rabbitMessage {
    content: Buffer;
}

export function getFromRabbit(queueName: string, callback: (result: string | null, err: string | null) => void) {
        const connectURL = "amqp://dbdolphin.viter.dk:5672";
        amqp.connect(connectURL, function (err: Error, conn: any) {
            if (err) {
                callback(null, err.message);
            }
            if(conn){
                conn.createChannel(function (err: Error, ch: any) {
                    if (err) {
                        console.log(err);
                        callback(null, err.message);
                        return;
                    }
                        ch.assertQueue(queueName, { durable: false });
                        ch.prefetch(1);
                        //console.log(`Waiting for data from ${queueName}`);
                        ch.consume(queueName, (message: rabbitMessage) => {
                            //TODO: Update rabbitMessage to actual object, content might be a buffer
                            console.log(message.content.toString('utf8'));
                            callback(message.content.toString('utf8'), null);
                            ch.ack(message);
                        }, {noAck: false});
                });
            }
            
        })
}

export function sendToRabbit(message: string, queueName: string, callback: (result: string | null, err: string | null) => void) {
    return new Promise((resolve, reject) => {
        const connectURL = "amqp://dbdolphin.viter.dk:5672";
        amqp.connect(connectURL, function (err: Error, conn: any) {
            if (err) {
                callback(null, err.message);
                return;
            }
            conn.createChannel(function (err: Error, ch: any) {
                if (err) {
                    console.log(err);
                    callback(null, err.message);
                    return;
                }
                console.log(`[rabbitPublisher.sendToRabbit] Sending to ${queueName} the data: ${message}`)
                ch.assertQueue(queueName, { durable: false });
                ch.sendToQueue(queueName, Buffer.from(message));
                callback(null, null);
            });
        });
    })
}
