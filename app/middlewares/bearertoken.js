const bearerToken = require('express-bearer-token');

module.exports = app => {
    app.use(bearerToken())
}