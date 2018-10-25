import fs from 'fs';
const xml2js = require('xml2js');
const soapRequest = require('easy-soap-request');
const regexReplace = /({\?\?\?})/;

/**
 * This is made to allow easier parsing of xml response.
 * It might look bad, but try parsing the return result from this manually:
 * {"S:Envelope":{"$":{"xmlns:S":"http://schemas.xmlsoap.org/soap/envelope/"},"S:Body":[{"ns2:creditScoreResponse":[{"$":{"xmlns:ns2":"http://service.web.credit.bank.org/"},"return":["228"]}]}]}}
 */
interface creditScoreResponse {
    'S:Envelope': {
        '$': {
            'xmlns:S': string;
            
        },
        'S:Body': [{
            'ns2:creditScoreResponse': [{
                '$': {
                    'xmlns:ns2': string;
                },
                'return': [
                    string
                ]
            }]
        }]
    };
}

export interface socialSecurityNumber {
    ssn: string
}

interface creditScore {
    ssn: string;
    creditScore: number;
}

function isValidSSN(ssn: socialSecurityNumber) {
    return ssn.ssn.match(/\d{6}-\d{4}/);
}

function getValueFromResponse(response: creditScoreResponse): number {
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

        const xml = fs.readFileSync('./resources/xml/CreditScoreService.xml', 'utf-8').replace(regexReplace, ssn.ssn);

        // usage of module
        (async () => {
            const { response } = await soapRequest(url, headers, xml);
            const { body, statusCode } = response;
            xml2js.parseString(body, (err: Error, result: creditScoreResponse) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    creditScore: getValueFromResponse(result),
                    ssn: ssn.ssn
                });
            });
        })();
    })
    
}
