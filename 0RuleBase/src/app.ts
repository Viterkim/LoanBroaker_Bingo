import express from 'express';
import { api } from './routes/api';

const app = express();
const port = 3000;

app.use('/', api);

app.listen(port, () => console.log(`0RuleBase listening on ${port}!`))
