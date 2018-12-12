import {LoanObject} from './types/CreditTypes'
import {getFromTranslator, sendToRabbit} from './rabbitmq/rabbitmq';

interface LoanResponse{
    ssn: string;
    interestRate: number;
}

switch(parseInt(process.argv[2])){
    case 1:
        console.log("Listening to ViktoBanken")
        getFromTranslator(`viktobanken`).then(result => {
            if(result.replyTo){
                const interestRate = parseFloat((Math.random() * (10) + 0.0200).toFixed(4));
                console.log(interestRate);
                console.log(result.replyTo);
                const loanResponse : LoanResponse = {
                    interestRate: interestRate,
                    ssn: result.loanRequest.ssn
                }
                sendToRabbit(JSON.stringify(loanResponse), result.replyTo).then(() => {
                    console.log("Response sent");
                })
            }else{
                sendToRabbit("No respond header was included in reply-to", "viktobanken").then(() => {
                    console.log("Response sent");
                })
            }
        }).catch(e => {
            console.log(e)
        });
    break;
    case 2:
    console.log("Listening to JavaBanken")
    getFromTranslator(`javabanken`).then(result => {
        if(result.replyTo){
            const interestRate = parseFloat((Math.random() * (10) + 0.0200).toFixed(4));
            console.log(interestRate);
            console.log(result.replyTo);
            const loanResponse : LoanResponse = {
                interestRate: interestRate,
                ssn: result.loanRequest.ssn
            }
            sendToRabbit(JSON.stringify(loanResponse), result.replyTo).then(() => {
                console.log("Response sent");
            })
        }else{
            sendToRabbit("No respond header was included in reply-to", "viktobanken").then(() => {
                console.log("Response sent");
            })
        }
    }).catch(e => {
        console.log(e)
    });
    break;
}
    

    