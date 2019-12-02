import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/api';
import bearerToken from 'express-bearer-token';
import mongoose from 'mongoose';
import databaseConfig from './config/database';

mongoose.Promise = global.Promise;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());
// app.db = new Sequelize(database);

//How to use: app.translator.validation.required 
app.translator = require('./lang/translate.js').default;

app.use(routes);

app.jwt = require('jsonwebtoken');

mongoose.set('useCreateIndex', true);
const server = mongoose.connect(process.env.MONGODB_PATH, databaseConfig)
    .then(() => {
        console.log('mongodb started.');
        return app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
            console.log(`Server started on ${process.env.APP_HOST}:${process.env.APP_PORT} `);
        });
    }).catch((error) => {
        console.log(error);
        console.log('Mongodb connection failed.');
        process.exit(1);
    });

    export default server;