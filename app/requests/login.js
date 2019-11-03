const { body } = require('express-validator');
module.exports = app => [
     body('email')
          .exists().withMessage(app.translator.validation.required),
     body('password')
          .exists().withMessage(app.translator.validation.required)
]