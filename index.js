const app = require('express')();
const consign = require('consign');
const Sequelize = require('sequelize');

database = require('./config/database');

app.db = new Sequelize(database);

//How to use: app.translator.validation.required 
app.translator = require('./lang/translate.js');

consign({ cwd: 'app' })
    .then('./middlewares')
    .then('./models')
    .then('./controllers')
    .then('./rules')
    .then('./requests')
    .then('../routes/api.js')
    .into(app);

app.listen(3000, () => {

    console.log('Listen port 3000')
})