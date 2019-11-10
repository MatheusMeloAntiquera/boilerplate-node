import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/api';
import Sequelize from 'sequelize';
import bearerToken from 'express-bearer-token';

// database = require('./config/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bearerToken())
// app.db = new Sequelize(database);

//How to use: app.translator.validation.required 
app.translator = require('./lang/translate.js').default;

app.use(routes);

app.jwt = require('jsonwebtoken');

app.listen(3000, () => {

    console.log('Listen port 3000');
});