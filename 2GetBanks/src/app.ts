import { watchRabbit } from './controllers/api/api';

//1) Get credit score from "CreditService" channel in RabbitMQ.
//2) Get Rule Base for credit score - select banks based on that.
//3) Send to RabbitMQ channel "BankRecipients", data: BankID, ssn, credit score, loan duration, loan amount

watchRabbit();
