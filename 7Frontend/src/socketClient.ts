import openSocket from 'socket.io-client';

export default class WebSocketClient {

    private SERVER_URL = 'http://dolphin.viter.dk:9006/';
    private ssn = '';

    constructor(ssn: string) {
        this.ssn = ssn;
    }

    start(onMessage: (message: string) => void) {
        const socket = openSocket(this.SERVER_URL);

        socket.on('message', (message: string) => {
            console.log(`[message]: ${message}`);
            onMessage(message);
        })

        socket.emit('message', this.ssn);

        /*
        socket.onopen = () => {
            console.log(`Connected to Websocket Server`);
            const json = JSON.stringify({
                message: this.ssn
            });
            socket.send(json);
        }
        
        socket.onmessage = (event) => {
            console.log(`onmessage: ${JSON.stringify(event.data)}`);
            onMessage(event.data);
        }
        
        socket.onerror = (event) => {
            console.log(`onerror: ${JSON.stringify(event)}`);
        }
        
        socket.onclose = (event) => {
            console.log(`onclose. code: ${event.code}, reason: ${event.reason}`);
        }
        */
    }

}
