import fs from 'fs';
import { CreditScoreResponse, CreditScore } from '../../types/CreditTypes';
const xml2js = require('xml2js');
const soapRequest = require('easy-soap-request');

function isValidSSN(ssn: string) {
    return ssn.match(/\d{6}-\d{4}/);
}

export function getValueFromResponse(response: CreditScoreResponse): number {
    return parseInt(response["S:Envelope"]["S:Body"]["0"]["ns2:creditScoreResponse"]["0"].return["0"]);
}

export function getCreditScoreFromService(ssn: string = '858585-8585'): Promise<CreditScore> {
    return new Promise((resolve, reject) => {
        if (!isValidSSN(ssn)) {
            reject('Invalid ssn');
            return;
        }

        // example data
        const url = 'http://datdb.cphbusiness.dk:8080/CreditScoreService/CreditScoreService';
        const headers = {
            'Content-Type': 'text/xml; charset=UTF-8'
        };

        const xml = replaceRegex(fs.readFileSync('./resources/xml/CreditScoreService.xml', 'utf-8'), ssn);

        // usage of module
        (async () => {
            const { response } = await soapRequest(url, headers, xml).catch((err: any) => {
                console.log(`Error with soapRequest!`);
                reject(err);
            });
            const { body, statusCode } = response;
            console.log(response);
            if (statusCode !== 200) {
                reject(`Server returned status code: ${statusCode}`);
                return;
            }
            try {
                const result = await parseXML(body);
                resolve({
                    creditScore: getValueFromResponse(result),
                    ssn: ssn
                });
            } catch (err) {
                reject(err);
            }
        })();
    })
}

export function parseXML(body: any): Promise<CreditScoreResponse> {
    return new Promise((resolve, reject) => {
        xml2js.parseString(body, (err: Error, result: CreditScoreResponse) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    })
}

function replaceRegex(text: string, replace: string) {
    const REGEX_REPLACE = /({\?\?\?})/;
    return text.replace(REGEX_REPLACE, replace);
}
