import { Bank } from './BankTypes';
import { LoanObject } from './CreditTypes';

export interface RecipientRequest {
    bankArray: Array<Bank>;
    loanObject: LoanObject;
}

export interface BankRequest {
    bank: Bank;
    loanObject: LoanObject;
    uuid: string;
    totalParts: number;
}
