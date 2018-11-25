import WebSocketClient from "./nativeSocket";
import { BankQuote } from "./types/BankTypes";

export function handleRequest(ssn: string, loanDuration: number, loanAmount: number, updateCallback: (bankQuote: BankQuote) => void, closeCallback: (code: number, reason: string) => void) {
    sendRequestToBanks(ssn, loanDuration, loanAmount);
    openWebsocket(ssn, updateCallback, closeCallback);
}


function sendRequestToBanks(ssn: string, loanDuration: number, loanAmount: number) {
    //TODO: POST request, with the ssn, duration and amount in body, and change the 1Get... project, 
    //so that it accepts this request and can handle all the data from there.
}

export function openWebsocket(ssn: string, updateCallback: (bankQuote: BankQuote) => void, closeCallback: (code: number, reason: string) => void) {
    const client = new WebSocketClient(ssn);
    client.start(updateCallback, closeCallback);
    //client.start(updateCallback);
}
