import {LoanObject} from './types/CreditTypes'
import {getFromTranslator, sendToRabbit} from './rabbitmq/rabbitmq';

interface LoanResponse{
    ssn: string;
    interestRate: number;
}

switch(parseInt(process.argv[2])){
    case 1:
        console.log("Listening to ViktoBanken")
        getFromTranslator(`bingobango`, (result, err) => {
            if(err){
                console.error(err);
                return;
            }
            if(result && result.replyTo){
                const interestRate = parseFloat((Math.random() * (10) + 0.0200).toFixed(4));
                console.log(interestRate);
                console.log(result.replyTo);
                const loanResponse : LoanResponse = {
                    interestRate: interestRate,
                    ssn: result.loanRequest.ssn
                }
                sendToRabbit(JSON.stringify(loanResponse), result.replyTo, (result) => {
                    console.log("Response sent");
                })
            }else{
                sendToRabbit("No respond header was included in reply-to", "viktobanken",  () => {
                    console.log("Response sent");
                })
            }
        })
            
    break;
    case 2:
    console.log("Listening to JavaBanken")
    getFromTranslator(`javabanken`, (result, err) => {
        if(err){
            console.error(err);
            return;
        }
        if(result && result.replyTo){
            const interestRate = parseFloat((Math.random() * (10) + 0.0200).toFixed(4));
            console.log(interestRate);
            console.log(result.replyTo);
            const loanResponse : LoanResponse = {
                interestRate: interestRate,
                ssn: result.loanRequest.ssn
            }
            sendToRabbit(JSON.stringify(loanResponse), result.replyTo, () => {
                console.log("Response sent");
            })
        }else{
            sendToRabbit("No respond header was included in reply-to", "viktobanken", () => {
                console.log("Response sent");
            })
        }
    })
    break;
}
    

    