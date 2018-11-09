import fs from 'fs';
import { getFromRabbit } from "../rabbitmq/rabbitWorker";
import { LoanObject } from "../../types/CreditTypes";
import { RuleBaseResponse, Bank } from '../../types/BankTypes';
const soapRequest = require('easy-soap-request');
const xml2js = require('xml2js');

export function getValueFromResponse(response: RuleBaseResponse): Array<Bank> {
    return JSON.parse(response["soap:Envelope"]["soap:Body"][0]["tns:RuleBaseOperationResponse"][0]["tns:bankListJSON"][0]);
}

export function watchRabbit() {
    console.log(`Running 2GetBanks`);
    setInterval(() => {
        getFromRabbit('CreditService').then((result: string) => {
            const loanObject: LoanObject = JSON.parse(result);
            if (!loanObject.creditScore) {
                console.log(`Received request for SSN: ${loanObject.ssn} without creditScore. Discarding request.`);
                return;
            }
            getRuleBaseFromService(loanObject.creditScore, loanObject.loanAmount, loanObject.loanDuration);
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
    }, 100);
}

//TODO: Replace <any> with specified type when we find out what type it should actually be
export function getRuleBaseFromService(creditScore: number, loanAmount: number, loanDuration: number, url: string = 'localhost:3000'): Promise<Array<Bank>> {
    return new Promise((resolve, reject) => {
        // example data
        const headers = {
            'Content-Type': 'text/xml;charset=UTF-8'
        };

        let xml = replaceXMLData(fs.readFileSync('./resources/xml/RequestRuleBase.xml', 'utf-8'), creditScore, loanAmount, loanDuration);

        // usage of module
        (async () => {
            const { response } = await soapRequest(url, headers, xml);
            const { body, statusCode } = response;
            if (statusCode !== 200) {
                reject(`Server returned status code: ${statusCode}`);
                return;
            }
            const result = await parseXML(body);
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
