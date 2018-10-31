import fs from 'fs';
import { creditScore, creditScoreResponse, socialSecurityNumber } from '../../types/CreditTypes';
const xml2js = require('xml2js');
const soapRequest = require('easy-soap-request');

const REGEX_REPLACE = /({\?\?\?})/;

function isValidSSN(ssn: socialSecurityNumber) {
    return ssn.ssn.match(/\d{6}-\d{4}/);
}

export function getValueFromResponse(response: creditScoreResponse): number {
    return parseInt(response["S:Envelope"]["S:Body"]["0"]["ns2:creditScoreResponse"]["0"].return["0"]);
}

export function getCreditScoreFromService(ssn: socialSecurityNumber = { ssn: '858585-8585' }): Promise<creditScore> {
    return new Promise((resolve, reject) => {
        if (!isValidSSN(ssn)) {
            reject('Invalid ssn');
            return;
        }
        // example data
        const url = 'http://datdb.cphbusiness.dk:8080/CreditScoreService/CreditScoreService';
        const headers = {
            'Content-Type': 'text/xml;charset=UTF-8'
        };

        const xml = fs.readFileSync('./resources/xml/CreditScoreService.xml', 'utf-8').replace(REGEX_REPLACE, ssn.ssn);

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
                ssn: ssn.ssn
            });
        })();
    })
    
}

export function parseXML(body: any): Promise<creditScoreResponse> {
    return new Promise((resolve, reject) => {
        xml2js.parseString(body, (err: Error, result: creditScoreResponse) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    })
}
