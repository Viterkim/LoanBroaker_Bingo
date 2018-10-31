/**
 * This is made to allow easier parsing of the xml response for the SOAP server response.
 * It might look bad, but try parsing the return result from this manually:
 * {"S:Envelope":{"$":{"xmlns:S":"http://schemas.xmlsoap.org/soap/envelope/"},"S:Body":[{"ns2:creditScoreResponse":[{"$":{"xmlns:ns2":"http://service.web.credit.bank.org/"},"return":["228"]}]}]}}
 */
export interface creditScoreResponse {
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

export interface creditScore {
    ssn: string;
    creditScore: number;
}