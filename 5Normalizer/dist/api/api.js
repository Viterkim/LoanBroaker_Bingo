"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replaceXMLData(xml, ssn, creditScore, loanAmount, loanDuration) {
    var dataArr = [ssn, creditScore, loanAmount, loanDuration];
    for (var i = 0; i < dataArr.length; i++) {
        xml = replaceFirst(xml, "{???}", "" + dataArr[i]);
    }
    return xml;
}
exports.replaceXMLData = replaceXMLData;
function replaceFirst(text, search, replace) {
    return text.replace(search, replace);
}
exports.replaceFirst = replaceFirst;
function sendXml() {
}
exports.sendXml = sendXml;
