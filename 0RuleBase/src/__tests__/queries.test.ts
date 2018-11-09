import connection from '../controllers/mysql/connection';
import  { getBanks } from '../controllers/mysql/queries';

test('Can get banks based on valid input', (done) => {
    getBanks(500, 2000, 40).then((bankArr) => {
        connection.end(() => {
            expect(bankArr.length).toBe(2);
            done();
        })
    }).catch((err) => {
        console.log(err);
    })
})
