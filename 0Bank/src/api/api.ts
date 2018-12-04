export function replaceXMLData(xml: string, ssn: string, interestRate: string): string {
    const dataArr = [ssn, interestRate];
    for (let i = 0; i < dataArr.length; i++) {
        xml = replaceFirst(xml, `{???}`, `${dataArr[i]}`);
    }
    return xml;
}

export function replaceFirst(text: string, search: string, replace: string) {
    return text.replace(search, replace);
}