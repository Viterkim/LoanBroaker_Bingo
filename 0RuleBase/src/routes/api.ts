import { Request, Response, Router } from 'express'
import { getXML } from '../controllers/soapHandler';

const router: Router = Router();

router.get('/score/:score', (req, res) => {
    const score = correctScore(req, res);
    if (score) {
        res.json({
            message: `Hello from Rule Base Web Service, Score: ${score}`
        });
        getXML(score);
    }
})

function correctScore(req: Request, res: Response): number | undefined {
    let score = req.params.score;
    try {
        score = parseInt(score);
        if (isNaN(score)) {
            throw new Error(`Could not convert ${req.params.score} to integer.`);
        }
    } catch (err) {
        score = undefined;
    }
    if (!score || typeof(score) !== `number` || isNaN(score)) {
        res.json({
            error: `Parameter score is not a number`
        })
        return undefined;
    }
    return score;
}

export const api: Router = router;
