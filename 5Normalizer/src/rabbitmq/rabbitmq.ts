var amqp = require('amqplib/callback_api');

interface rabbitMessage {
    content: Buffer;
}

export function getFromRabbit(queueName: string, callback: (result: string | null, err: string | null) => void){
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
                ch.assertQueue(queueName, { durable: false });
                ch.prefetch(1);
                //console.log(`Waiting for data from ${queueName}`);
                ch.consume(queueName, (message: rabbitMessage) => {
                    //TODO: Update rabbitMessage to actual object, content might be a buffer
                    callback(message.content.toString('utf8'), null)
                    ch.ack(message);
                }, {noAck: false});
            });
        })
}

export function sendToRabbit(message: string, queueName: string, callback: (result: string | null, err: string | null) => void){
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
                callback(null, null)
            });
        });
    })
}

export function sendToBank(queueName: string, message: string, callback: (result: string | null, err: string | null) => void){
    return new Promise((resolve, reject) => {
        amqp.connect("amqp://datdb.cphbusiness.dk:5672", function (err: Error, conn: any) {
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
                callback(null, null)
            });
        });
    })
    
}

export function getFromBank(queueName: string, callback: (result: string | null, err: string | null) => void){
    return new Promise((resolve, reject) => {
        const connectURL = "amqp://datdb.cphbusiness.dk:5672";
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
                ch.assertQueue(queueName, { durable: false });
                ch.prefetch(1);
                //console.log(`Waiting for data from ${queueName}`);
                ch.consume(queueName, (message: rabbitMessage) => {
                    //TODO: Update rabbitMessage to actual object, content might be a buffer
                    console.log(message.content.toString('utf8'))
                    ch.ack(message);
                    callback(message.content.toString('utf8'), null)
                }, {noAck: false});
            });
        })
    })
}