import express from 'express';
import { api } from './routes/api';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = 9001;

app.use(bodyParser.json());
app.use(cors());

app.use('/', api);

app.listen(port, () => console.log(`1GetCreditScore listening on ${port}!`))
