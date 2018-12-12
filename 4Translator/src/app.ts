import {LoanObject} from './types/CreditTypes'
import {getFromRabbit, sendToRabbit, sendToBank} from './rabbitmq/rabbitmq';
import XMLTranslator from './translators/XMLTranslator';
import {formatJson} from './translators/JSONTranslator'
import { BankRequest } from './types/RecipientTypes';

    getFromRabbit(`Bank ${process.argv[2]} Queue`).then(result => {
    
        switch(parseInt(process.argv[2])){
            case 1:
                const jsonRequest1 = formatJson(result);
                if(jsonRequest1 !== null || jsonRequest1 !== undefined){
                    sendToRabbit(JSON.stringify(jsonRequest1), "viktobanken").then(r => {
                        console.log("sent off to viktobanken");
                    })
                }
            break;
            case 2:
                const jsonRequest2 = formatJson(result);
                if(jsonRequest2 !== null || jsonRequest2 !== undefined){
                sendToRabbit(JSON.stringify(jsonRequest2), "javabanken").then(r => {
                    console.log("sent off to viktobanken");
                })
            }
            break;
            case 3:
                const xmlRequest = new XMLTranslator(JSON.parse(result)).getParsedXML();
                console.log(`Read from rabbit loan request ${xmlRequest}`);
                sendToBank("cphbusiness.bankXML", xmlRequest).then(r => {
                    if(r){
                        console.log("Successfully sent off data to bank")
                    }else{
                        console.log("Something went wrong with the transaction, please try again later")
                    }
                });
            break;
            case 4:
                const jsonRequest = formatJson(result);
                console.log(`Read from rabbit loan request ${JSON.stringify(jsonRequest)}`);
                sendToBank("cphbusiness.bankJSON", JSON.stringify(jsonRequest)).then(r => {
                    if(r){
                        console.log("Successfully sent off data to bank")
                    }else{
                        console.log("Something went wrong with the transaction, please try again later")
                    }
                });
                
            break;
            
        }
    }).catch(e => {
        
    });

    