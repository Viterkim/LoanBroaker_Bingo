"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatJson(json) {
    var bankRequest = JSON.parse(json);
    var baseDate = new Date("1970-01-01 01:00:00.0");
    var loanDateStr = JSON.stringify(new Date(baseDate.setMonth(baseDate.getMonth() + bankRequest.loanObject.loanDuration)));
    var loanDateArr = loanDateStr.split("T");
    var loanTime = loanDateArr[1].split("Z");
    return {
        ssn: bankRequest.loanObject.ssn,
        creditScore: bankRequest.loanObject.creditScore,
        loanAmount: bankRequest.loanObject.loanAmount,
        loanDuration: loanDateArr[0] + " " + loanTime[0].replace(".000", ".0") + " CET"
    };
}
exports.formatJson = formatJson;
