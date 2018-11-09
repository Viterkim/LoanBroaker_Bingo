import { getFromRabbit, sendToRabbit } from "./controllers/rabbitmq/rabbitWorker";
import { RecipientRequest, BankRequest } from "./types/RecipientTypes";
import uuid from 'uuid-by-string';

setInterval(() => {
    getFromRabbit('RecipientQueue').then((result: string) => {
        const recipientObject: RecipientRequest = JSON.parse(result);
        //Send a message to each bank
        const randomUUID = uuid(`${recipientObject.loanObject.ssn}:${new Date().getTime()}`);
        const count = recipientObject.bankArray.length;
        for (let i = 0; i < count; i++) {
            const bankRequest: BankRequest = {
                bank: recipientObject.bankArray[i],
                loanObject: recipientObject.loanObject,
                totalParts: count,
                uuid: randomUUID
            }
            sendToRabbit(JSON.stringify(bankRequest), `Bank ${bankRequest.bank.id} Queue`).catch((err) => {
                console.log(err);
            });
        }
    })
}, 100)
