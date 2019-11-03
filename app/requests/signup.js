const { body } = require('express-validator');
module.exports = app => [
     body('email')
          .exists().withMessage(app.translator.validation.required)
          .isEmail().withMessage(app.translator.validation.email)
          .custom(app.rules.uniqueEmail),
     body('password')
          .exists().withMessage(app.translator.validation.required)
          .isLength({ min: 6 }).withMessage(app.translator.validation.min.string.replace(':min', 6)),
     body('name')
          .exists().withMessage(app.translator.validation.required)
]