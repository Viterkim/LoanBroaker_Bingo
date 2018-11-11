import { BankRequest } from '../types/RecipientTypes';
import {replaceXMLData} from '../api/api'
import fs from 'fs'
import LoanRequest from './LoanRequest'

export default class XMLTranslator {
    
    bankRequest: BankRequest;

    constructor(bankRequest: BankRequest) {
        this.bankRequest = bankRequest;
    }

    getParsedXML(): string{
        const loanObject = this.bankRequest.loanObject;
        if(!loanObject.creditScore){
            throw Error("No CreditScore Given")
        }
        const baseDate = new Date("1970-01-01 01:00:00.0")
        const loanDateStr = JSON.stringify(new Date(baseDate.setMonth(baseDate.getMonth() + loanObject.loanDuration)));
        const loanDateArr = loanDateStr.split("T");
        const loanTime = loanDateArr[1].split("Z");
        return replaceXMLData(LoanRequest, loanObject.ssn, loanObject.creditScore, loanObject.loanAmount, `${loanDateArr[0]} ${loanTime[0].replace(".000", ".0")} CET`);
    }

}
