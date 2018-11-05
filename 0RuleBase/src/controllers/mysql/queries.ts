import mysql, { Connection } from 'mysql';
import connection from './connection';
//@ts-ignore
import Bank from '../../types/BankTypes';


export function getBanksFromRating(rating: number) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from bank WHERE minRating <= ?',
      [rating],
      (error: any, results: Array<Bank>, fields: any) => {
        resolve(results);
    });
  });
}
