import { BankRequest } from '../types/RecipientTypes';

export function formatJson(json: string){
    const bankRequest : BankRequest = JSON.parse(json);
    const baseDate = new Date("1970-01-01 01:00:00.0")
    const loanDateStr = JSON.stringify(new Date(baseDate.setMonth(baseDate.getMonth() + bankRequest.loanObject.loanDuration)));
    const loanDateArr = loanDateStr.split("T");
    const loanTime = loanDateArr[1].split("Z");
    return {
        ssn: bankRequest.loanObject.ssn,
        creditScore: bankRequest.loanObject.creditScore,
        loanAmount: bankRequest.loanObject.loanAmount,
        loanDuration: `${loanDateArr[0]} ${loanTime[0].replace(".000", ".0")} CET`
    }
}

