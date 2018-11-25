import ws from 'ws';
import { getFromRabbit } from './rabbit/rabbitmq';
import { BankQuote } from './types/BankTypes';

export default class SocketManager {

    private timeout: number = 5000;
    private sockets: Array<ws> = [];

    constructor(timeout?: number, sockets?: Array<ws>) {
        this.timeout = timeout ? timeout : 5000;
        sockets && sockets.forEach(element => {
            this.addSocket(element);
        });
    }

    private arrayRemove = (socket: ws): Array<ws> => {
        //@ts-ignore
        clearInterval(socket.subscribeID);
        socket.close();
        return this.sockets.filter((element) => {
            //@ts-ignore
            if (socket.subscribeID === element.subscribeID) {
                return false;
            }
            return true;
        });
    }

    public addSocket = (socket: ws) => {
        setTimeout(() => {
            this.arrayRemove(socket);
        }, this.timeout);
        socket.on('message', (ssn) => {
            console.log(`Received message: ${ssn}`);
            const subscribeID = setInterval(() => {
                getFromRabbit(`ssn:${ssn}`).then((data) => {
                    socket.send(data);
                }).catch((err) => {
                    console.log(err);
                });
                const testData: BankQuote = {
                    bankName: 'testBank',
                    interest: 12.65
                }
                socket.send(JSON.stringify(testData));
            }, 1000);
            //@ts-ignore
            socket.subscribeID = subscribeID;
        })
        this.sockets.push(socket);
    }

    public getSockets = (): Array<ws> => {
        return this.sockets;
    }



}


