var amqp = require("amqplib/callback_api");
import {LoanObject} from '../types/CreditTypes'
interface rabbitMessage {
    content: Buffer;
    properties: any;
}

interface BankRequest{
    loanRequest: LoanObject;
    replyTo: string;
}

export function sendToRabbit(
    message: string,
    queueName: string,
    callback: (result: boolean, err: string | null) => void
){
        const connectURL = "amqp://dbdolphin.viter.dk:5672";
        amqp.connect(
            connectURL,
            function(err: Error, conn: any) {
                if (err) {
                    callback(false, err.message);
                    return;
                }
                conn.createChannel(function(err: Error, ch: any) {
                    if (err) {
                        console.log(err);
                        callback(false, err.message);
                        return;
                    }
                    console.log(
                        `[rabbitPublisher.sendToRabbit] Sending to ${queueName} the data: ${message}`
                    );
                    ch.assertQueue(queueName, { durable: false });
                    ch.sendToQueue(queueName, Buffer.from(message));
                    callback(true, null);
                });
            }
        );
}

export function sendToBank(queueName: string, message: string, callback: (result: boolean, err: string | null) => void) {
        amqp.connect(
            "amqp://datdb.cphbusiness.dk:5672",
            function(err: Error, conn: any) {
                if (err) {
                    callback(false, err.message);
                    return;
                }
                conn.createChannel(function(err: Error, ch: any) {
                    if (err) {
                        console.log(err);
                        callback(false, err.message);
                        return;
                    }
                    console.log(
                        `[rabbitPublisher.sendToRabbit] Sending to ${queueName} the data: ${message}`
                    );
                    ch.assertQueue(queueName, { durable: false });
                    //ch.sendToQueue(queueName, Buffer.from(message), { 'reply-to': "bingoboisReply" });
                    ch.publish(queueName, "", Buffer.from(message), {
                        replyTo: "bingoboisReply"
                    });
                    callback(true, null)
                });
            }
        );
}
export function getFromBank(queueName: string, callback: (result: boolean | string, err: string | null) => void) {
        const connectURL = "amqp://datdb.cphbusiness.dk:5672";
        amqp.connect(connectURL, function (err: Error, conn: any) {
            if (err) {
                callback(false, err.message);
            }
            conn.createChannel(function (err: Error, ch: any) {
                if (err) {
                    console.log(err);
                    callback(false, err.message);
                    return;
                }
                    ch.assertQueue(queueName, { durable: false });
                    ch.prefetch(1);
                    console.log(`Waiting for data from ${queueName}`);
                    ch.consume(queueName, (message: rabbitMessage) => {
                        //TODO: Update rabbitMessage to actual object, content might be a buffer
                        callback(message.content.toString('utf8'), null)
                        ch.ack(message);
                    }, {noAck: false});
            });
        })
}

export function sendToBingoBank(queueName: string, message: string, callback: (result: boolean | string | null, err: string | null) => void) {
        amqp.connect(
            "amqp://dbdolphin.viter.dk:5672",
            function(err: Error, conn: any) {
                if (err) {
                    callback(null, err.message);
                    return;
                }
                conn.createChannel(function(err: Error, ch: any) {
                    if (err) {
                        console.log(err);
                        callback(null, err.message);
                        return;
                    }
                    console.log(
                        `[rabbitPublisher.sendToRabbit] Sending to ${queueName} the data: ${message}`
                    );
                    ch.assertQueue(queueName, { durable: false });
                    //ch.sendToQueue(queueName, Buffer.from(message), { 'reply-to': "bingoboisReply" });
                    ch.publish(queueName, "", Buffer.from(message), {
                        replyTo: "bingoboisReply"
                    });
                    callback(true, null);
                });
            }
        );
}


export function getFromTranslator(queueName: string, callback: (result: BankRequest | null, err: string | null) => void) {
        const connectURL = "amqp://dbdolphin.viter.dk:5672";
        amqp.connect(connectURL, function (err: Error, conn: any) {
            if (err) {
                callback(null, err.message);
            }
            conn.createChannel(function (err: Error, ch: any) {
                if (err) {
                    console.log(err);
                    callback(null, err.message);
                    return;
                }
                    ch.assertQueue(queueName, { durable: false });
                    ch.prefetch(1);
                    console.log(`Waiting for data from ${queueName}`);
                    ch.consume(queueName, (message: rabbitMessage) => {
                        //TODO: Update rabbitMessage to actual object, content might be a buffer
                        const bankRequest: BankRequest = {
                            loanRequest: JSON.parse(message.content.toString("utf8")),
                            replyTo: message.properties.replyTo
                        }
                        callback(bankRequest, null)
                        ch.ack(message);
                    }, {noAck: false});
               
            });
        })
}