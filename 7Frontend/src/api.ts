import WebSocketClient from "./socketClient";

export function handleRequest(ssn: string, loanDuration: number, loanAmount: number, updateCallback: (bankQuote: any) => void) {
    sendRequestToBanks(ssn, loanDuration, loanAmount);
    openWebsocket(ssn, updateCallback);
}


function sendRequestToBanks(ssn: string, loanDuration: number, loanAmount: number) {
    //TODO: POST request, with the ssn, duration and amount in body, and change the 1Get... project, 
    //so that it accepts this request and can handle all the data from there.
}

export function openWebsocket(ssn: string, updateCallback: (bankQuote: any) => void) {
    const client = new WebSocketClient(ssn);
    client.start(updateCallback);
}
