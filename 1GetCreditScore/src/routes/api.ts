import bodyParser from 'body-parser';
import { Request, Response, Router } from 'express'
import { getCreditScoreFromService } from '../controllers/soap/soapHandler';
import { sendToRabbit } from '../controllers/rabbitmq/rabbitPublisher';
import { LoanObject } from '../types/CreditTypes';

const router: Router = Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
    const loanObject = correctBody(req, res);
    if (loanObject) {
        console.log(`Found loanObject: ${JSON.stringify(loanObject)}`);
        getCreditScoreFromService(loanObject.ssn).then((creditScore) => {
            loanObject.creditScore = creditScore.creditScore;
            console.log(`LoanObject: ${JSON.stringify(loanObject)}`);
            sendToRabbit(JSON.stringify(loanObject), "CreditService").then((result) => {
                res.json({
                    message: `Your credit score for ssn: ${loanObject.ssn} is: ${loanObject.creditScore}`
                });
            }).catch((err) => {
                res.json({
                    error: `${err}`
                });
            });
        }).catch((err) => {
            res.json({
                error: `${err}`
            });
        });
    }
})

function correctBody(req: Request, res: Response): LoanObject | undefined {
    const body = req.body;
    if (!body) {
        res.status(400);
        res.json({
            error: `No body present on POST request`
        });
        return undefined;
    }
    if (!body.ssn || typeof(body.ssn) !== `string`) {
        res.status(400);
        res.json({
            error: `ssn is missing or not a string`
        });
        return undefined;
    } else if (!body.loanAmount || typeof(body.loanAmount) !== `number`) {
        res.status(400);
        res.json({
            error: `loanAmount is missing or not a number`
        });
        return undefined;
    } else if (!body.loanDuration || typeof(body.loanDuration) !== `number`) {
        res.status(400);
        res.json({
            error: `loanDuration is missing or not a number`
        });
        return undefined;
    }
    return {
        ssn: req.body.ssn,
        loanAmount: req.body.loanAmount,
        loanDuration: req.body.loanDuration
    };
}

export const api: Router = router;
