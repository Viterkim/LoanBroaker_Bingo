import { getRuleBaseFromService } from "./controllers/api/api";
import {
  getFromRabbit,
  sendToRabbit
} from "./controllers/rabbitmq/rabbitWorker";
import { LoanObject } from "./types/CreditTypes";
import { RecipientRequest } from "./types/RecipientTypes";

//1) Get credit score from "CreditService" channel in RabbitMQ.
//2) Get Rule Base for credit score - select banks based on that.
//3) Send to RabbitMQ channel "BankRecipients", data: BankID, ssn, credit score, loan duration, loan amount

console.log(`Running 2GetBanks`);
getFromRabbit("CreditService").then((result: string) => {
  const loanObject: LoanObject = JSON.parse(result);
  if (!loanObject.creditScore) {
    console.log(
      `Received request for SSN: ${
        loanObject.ssn
      } without creditScore. Discarding request.`
    );
    return;
  }
  getRuleBaseFromService(
    loanObject.creditScore,
    loanObject.loanAmount,
    loanObject.loanDuration
  ).then(bankArr => {
    const recipientRequestMessage: RecipientRequest = {
      bankArray: bankArr,
      loanObject: loanObject
    };
    sendToRabbit(
      JSON.stringify(recipientRequestMessage),
      `RecipientQueue`
    ).catch(err => {
      console.log("Sending");

      console.log(err);
    });
  });
});