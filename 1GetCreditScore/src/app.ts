import express from 'express';
import { api } from './routes/api';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(bodyParser.json())

app.post('/test', (req, res) => {
    console.log(`Replicating req.body`);
    console.log(req.body);
    res.json({
        body: req.body
    });
})

app.use('/', api);

app.listen(port, () => console.log(`1GetCreditScore listening on ${port}!`))
