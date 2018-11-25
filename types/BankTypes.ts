export interface Bank {
    id: number;
    name: string;
    minRating: number;
    url: string;
}

export interface RuleBaseResponse {
    'soap:Envelope': {
        '$': {
            'xmlns:S': string;
        },
        'soap:Body': [
            {
                'tns:RuleBaseOperationResponse': [
                    {
                        'tns:bankListJSON': [
                            string
                        ]
                    }
                ]    
            }
        ]
    };
}

export interface BankQuote {
    bankName: string;
    interest: number;
}
