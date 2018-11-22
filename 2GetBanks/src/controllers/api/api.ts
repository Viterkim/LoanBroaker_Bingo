import fs from 'fs';
import { getFromRabbit } from "../rabbitmq/rabbitWorker";
import { LoanObject } from "../../types/CreditTypes";
import { RuleBaseResponse, Bank } from '../../types/BankTypes';
const soapRequest = require('easy-soap-request');
const xml2js = require('xml2js');

export function getValueFromResponse(response: RuleBaseResponse): Array<Bank> {
    return JSON.parse(response["soap:Envelope"]["soap:Body"][0]["tns:RuleBaseOperationResponse"][0]["tns:bankListJSON"][0]);
}

//TODO: Replace <any> with specified type when we find out what type it should actually be
export function getRuleBaseFromService(creditScore: number, loanAmount: number, loanDuration: number, url: string = 'localhost:8001/'): Promise<Array<Bank>> {
    console.log("Getting from rulebase")
    return new Promise((resolve, reject) => {
        // example data
        const headers = {
            'Content-Type': 'text/xml;charset=UTF-8'
        };
        let xml = replaceXMLData(fs.readFileSync('./resources/xml/RequestRuleBase.xml', 'utf-8'), creditScore, loanAmount, loanDuration);
        // usage of module
        (async () => {
            
            const soap = await soapRequest('http://dolphin.viter.dk:9000/wsdl?wsdl', headers, xml).catch((e:any) => console.log(e));
            console.log(soap);
            console.log("READING SOAP REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            console.log(soap.response);
            const { body, statusCode } = soap.response;
            if (statusCode !== 200) {
                reject(`Server returned status code: ${statusCode}`);
                return;
            }
            console.log(body);
            const result = await parseXML(body);
            console.log(result);

            resolve(result);
        })();
    })

}

function replaceXMLData(xml: string, creditScore: number, loanAmount: number, loanDuration: number): string {
    const dataArr = [creditScore, loanAmount, loanDuration];
    for (let i = 0; i < 3; i++) {
        xml = replaceFirst(xml, `{???}`, `${dataArr[i]}`);
    }
    return xml;
}

export function replaceFirst(text: string, search: string, replace: string) {
    return text.replace(search, replace);
}

//TODO: Replace <any> type with specified Type
export function parseXML(body: any): Promise<Array<Bank>> {
    return new Promise((resolve, reject) => {
        xml2js.parseString(body, (err: Error, result: RuleBaseResponse) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(getValueFromResponse(result));
        });
    })
}
