import {LoanObject} from './types/CreditTypes'
import {getFromBank, sendToRabbit, sendToBank} from './rabbitmq/rabbitmq';
import XMLTranslator from './translators/XMLTranslator';
import {formatJson} from './translators/JSONTranslator'
import { BankRequest } from './types/RecipientTypes';

const CPHBUSINESS_BANK_URL = "datdb.cphbusiness.dk:5672"



getFromBank(`bingoboisReply`, result => {

});