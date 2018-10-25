
import { getFromRabbit } from './controllers/rabbitmq/rabbitWorker';

setInterval(() => {
    getFromRabbit('CreditService').then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })   
}, 100);

