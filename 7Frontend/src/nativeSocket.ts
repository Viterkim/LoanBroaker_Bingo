import { BankQuote } from "./types/BankTypes";


export default class WebSocketClient {

    private SERVER_URL = 'ws://dolphin.viter.dk:9006';
    private ssn = '';

    constructor(ssn: string) {
        this.ssn = ssn;
    }

    start(onMessage: (message: BankQuote) => void, onClose: (code: number, reason: string) => void) {
        const socket = new WebSocket(this.SERVER_URL);

        socket.onopen = (event) => {
            //console.log(event);
            socket.send(this.ssn);
        }

        socket.onmessage = (event) => {
            //console.log(event.data);
            onMessage(event.data);
        }

        socket.onclose = (event) => {
            onClose(event.code, event.reason);
        }

    }

}
