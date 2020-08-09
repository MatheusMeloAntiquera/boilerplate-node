import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './routes';
import bearerToken from 'express-bearer-token';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());


//How to use: app.translator.validation.required 
app.translator = require('./lang/translate.js').default;

app.use(Routes);

app.jwt = require('jsonwebtoken');

const server = app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Server started on ${process.env.APP_HOST}:${process.env.APP_PORT} `);
});

export default server;