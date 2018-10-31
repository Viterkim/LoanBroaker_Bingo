import { Request, Response, Router } from 'express'
import { getCreditScoreFromService } from '../controllers/soap/soapHandler';
import { sendToRabbit } from '../controllers/rabbitmq/rabbitPublisher';
import { socialSecurityNumber } from '../../../types/CreditTypes';

const router: Router = Router();

router.get('/', (req, res) => {
    getCreditScoreFromService().then((newCreditScore) => {
        sendToRabbit(JSON.stringify(newCreditScore), 'CreditService').then((result) => {
            res.json({
                message: `Your credit score for ssn: ${newCreditScore.ssn} is: ${newCreditScore.creditScore}`
            });
        }).catch((err) => {
            res.json({
                error: `${err}`
            })
        })
    }).catch((err) => {
        res.json({
            error: `${err}`
        })
    });
})

//Standard Test Route
router.get('/ssn/:ssn', (req: Request, res: Response) => {
    let ssn: socialSecurityNumber = { ssn: `${req.params['ssn']}` };
    getCreditScoreFromService(ssn).then((newCreditScore) => {
        sendToRabbit(JSON.stringify(newCreditScore), 'CreditService').then((result) => {
            res.json({
                message: `Your credit score for ssn: ${newCreditScore.ssn} is: ${newCreditScore.creditScore}`
            });
        }).catch((err) => {
            res.json({
                error: `${err}`
            })
        })
    }).catch((err) => {
        res.json({
            error: `${err}`
        })
    });
});

export const api: Router = router;
