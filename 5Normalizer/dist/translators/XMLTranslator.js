"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../api/api");
var LoanRequest_1 = __importDefault(require("./LoanRequest"));
var XMLTranslator = /** @class */ (function () {
    function XMLTranslator(bankRequest) {
        this.bankRequest = bankRequest;
    }
    XMLTranslator.prototype.getParsedXML = function () {
        var loanObject = this.bankRequest.loanObject;
        if (!loanObject.creditScore) {
            throw Error("No CreditScore Given");
        }
        var baseDate = new Date("1970-01-01 01:00:00.0");
        var loanDateStr = JSON.stringify(new Date(baseDate.setMonth(baseDate.getMonth() + loanObject.loanDuration)));
        var loanDateArr = loanDateStr.split("T");
        var loanTime = loanDateArr[1].split("Z");
        return api_1.replaceXMLData(LoanRequest_1.default, loanObject.ssn, loanObject.creditScore, loanObject.loanAmount, loanDateArr[0] + " " + loanTime[0].replace(".000", ".0") + " CET");
    };
    return XMLTranslator;
}());
exports.default = XMLTranslator;
