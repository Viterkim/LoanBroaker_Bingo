import mysql, { Connection } from 'mysql';
import connection from './connection';
import { Bank } from '../../types/BankTypes';

export function getBanks(rating: number, amount: number, duration: number): Promise<Array<Bank>> {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from bank WHERE minRating <= ? AND minAmount <= ? AND maxAmount >= ? AND minDuration <= ? AND maxDuration >= ?',
            [rating, amount, amount, duration, duration],
            (error: any, results: Array<Bank>, fields: any) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
    });
}
