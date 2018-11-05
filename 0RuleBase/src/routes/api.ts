import { Request, Response, Router } from 'express'
import { getXML } from '../controllers/soapHandler';
import bodyParser from 'body-parser';

const router: Router = Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
    let ruleRequest = correctBody(req, res);
    if (ruleRequest) {
        res.send(getXML(ruleRequest.bankCount, ruleRequest.maxRating));
    }
})

function correctBody(req: Request, res: Response): RuleRequest | undefined {
    const body = req.body;
    if (!body) {
        res.status(400);
        res.json({
            error: `No body present on POST request`
        });
        return undefined;
    }
    if (!body.bankCount || typeof(body.bankCount) !== `number`) {
        res.status(400);
        res.json({
            error: `bankCount is missing or not a number`
        });
        return undefined;
    } else if (!body.maxRating || typeof(body.maxRating) !== `number`) {
        res.status(400);
        res.json({
            error: `maxRating is missing or not a number`
        });
        return undefined;
    }
    return {
        bankCount: body.bankCount,
        maxRating: body.maxRating
    };
}

export const api: Router = router;
