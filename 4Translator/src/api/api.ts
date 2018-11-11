export function replaceXMLData(xml: string, ssn: string, creditScore: number, loanAmount: number, loanDuration: string): string {
    const dataArr = [ssn, creditScore, loanAmount, loanDuration];
    for (let i = 0; i < dataArr.length; i++) {
        xml = replaceFirst(xml, `{???}`, `${dataArr[i]}`);
    }
    return xml;
}

export function replaceFirst(text: string, search: string, replace: string) {
    return text.replace(search, replace);
}

export function sendXml(){

}