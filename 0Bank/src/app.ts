import {LoanObject} from './types/CreditTypes'
import {getFromTranslator, sendToRabbit} from './rabbitmq/rabbitmq';

interface LoanResponse{
    ssn: string;
    interestRate: number;
}

switch(parseInt(process.argv[2])){
    case 1:
        getFromTranslator(`viktobanken`).then(result => {
            const interestRate = parseFloat((Math.random() * (0 - 10.0000) + 0.0200).toFixed(4));
            console.log(interestRate);
            console.log(result.replyTo);
            const loanResponse : LoanResponse = {
                interestRate: interestRate,
                ssn: result.loanRequest.ssn
            }
            sendToRabbit(JSON.stringify(loanResponse), result.replyTo).then(() => {
                console.log("Response sent");
            })
        }).catch(e => {
            console.log(e)
        });
    break;
    case 2:
        getFromTranslator(`javabanken`).then(result => {
            const interestRate = parseFloat((Math.random() * (0 - 10.0000) + 0.0200).toFixed(4));
            console.log(interestRate);
            console.log(result.replyTo);
            const loanResponse : LoanResponse = {
                interestRate: interestRate,
                ssn: result.loanRequest.ssn
            }
            sendToRabbit(JSON.stringify(loanResponse), result.replyTo).then(() => {
                console.log("Response sent");
            })
        }).catch(e => {
            console.log(e)
        });
    break;
}
    

    