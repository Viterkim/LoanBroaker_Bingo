import { Request, Response, Router } from 'express'
import { soap } from '../controllers/soap/soapHandler';
const router: Router = Router();

//Standard Test Route
router.get('/', (req: Request, res: Response) => {
  soap();
  res.json({
    message: 'Hello and welcome to 1GetCreditScore'
})
});

export const api: Router = router;
