import fs from 'fs';
import { getFromRabbit } from "../rabbitmq/rabbitWorker";
import { loanObject } from "../../types/CreditTypes";
const soapRequest = require('easy-soap-request');
const xml2js = require('xml2js');

export function watchRabbit() {
    console.log(`Running 2GetBanks`);
    setInterval(() => {
        getFromRabbit('CreditService').then((result: string) => {
            const loanObject: loanObject = JSON.parse(result);
            if (!loanObject.creditScore) {
                console.log(`Received request for SSN: ${loanObject.ssn} without creditScore. Discarding request.`);
                return;
            }
            getRuleBaseFromService(loanObject.creditScore);

            console.log(result);
        }).catch((err) => {
            console.log(err);
        })   
    }, 100);
}

//TODO: Replace <any> with speicifed type when we find out what type it should actually be
export function getRuleBaseFromService(creditScore: number): Promise<any> {
    return new Promise((resolve, reject) => {
        // example data
        const url = 'http://datdb.cphbusiness.dk:8080/CreditScoreService/CreditScoreService';
        const headers = {
            'Content-Type': 'text/xml;charset=UTF-8'
        };

        const xml = replaceRegex(fs.readFileSync('./resources/xml/RequestRuleBase.xml', 'utf-8'), `${creditScore}`);

        // usage of module
        (async () => {
            const { response } = await soapRequest(url, headers, xml);
            const { body, statusCode } = response;
            if (statusCode !== 200) {
                reject(`Server returned status code: ${statusCode}`);
                return;
            }
            const result = await parseXML(body);
            resolve({
                creditScore: getValueFromResponse(result),
                ssn: ssn
            });
        })();
    })
    
}

function replaceRegex(text: string, replace: string) {
    const REGEX_REPLACE = /({\?\?\?})/;
    return text.replace(REGEX_REPLACE, replace);
}

//TODO: Replace <any> type with specified Type
export function parseXML(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
        xml2js.parseString(body, (err: Error, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    })
}
