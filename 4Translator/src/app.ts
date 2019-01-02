import {LoanObject} from './types/CreditTypes'
import {getFromRabbit, sendToRabbit, sendToBank} from './rabbitmq/rabbitmq';
import XMLTranslator from './translators/XMLTranslator';
import {formatJson} from './translators/JSONTranslator'
import { BankRequest } from './types/RecipientTypes';
  /* 
  FOR TEST PURPOSES
    const tempBankRequest: BankRequest = {
        bank: {
            id: 3,
            minRating: 100,
            name: "bingobank",
            url: "snabela.net"
        },
        loanObject: {
            creditScore: 200,
            loanAmount: 20000,
            loanDuration: 1,
            ssn: "8585858585"
        },
        totalParts: 3,
        uuid: "bingobango"
    }

    sendToRabbit(JSON.stringify(tempBankRequest), "bingobango").then(r => {
        console.log("sent off to viktobanken");
    })
  */
    getFromRabbit(`Bank ${process.argv[2]} Queue`, (result, err) => {
        if(err){
            console.error(err);
            return;
        }
        switch(parseInt(process.argv[2])){
            case 1:
            if(result){
                const jsonRequest1 = formatJson(result);
                if(jsonRequest1 !== null || jsonRequest1 !== undefined){
                    sendToRabbit(JSON.stringify(jsonRequest1), "viktobanken", r => {
                        console.log("sent off to viktobanken");
                    })
                }
            }
            break;
            case 2:
                if(result){
                    const jsonRequest2 = formatJson(result);
                    if(jsonRequest2 !== null || jsonRequest2 !== undefined){
                        sendToRabbit(JSON.stringify(jsonRequest2), "javabanken", r => {
                            console.log("sent off to viktobanken");
                        })
                    }
                }
            break;
            case 3:
            if(result){
                const xmlRequest = new XMLTranslator(JSON.parse(result)).getParsedXML();
                console.log(`Read from rabbit loan request ${xmlRequest}`);
                sendToBank("cphbusiness.bankXML", xmlRequest, r => {
                    if(r){
                        console.log("Successfully sent off data to bank")
                    }else{
                        console.log("Something went wrong with the transaction, please try again later")
                    }
                });
            }
            break;
            case 4:
                if(result){
                    const jsonRequest = formatJson(result);
                    console.log(`Read from rabbit loan request ${JSON.stringify(jsonRequest)}`);
                    sendToBank("cphbusiness.bankJSON", JSON.stringify(jsonRequest), r => {
                        if(r){
                            console.log("Successfully sent off data to bank")
                        }else{
                            console.log("Something went wrong with the transaction, please try again later")
                        }
                    });
                }
                
            break;
            
        }
    })
    