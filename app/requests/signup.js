
import { body } from 'express-validator'
import { validation } from '~/lang/translate'

export default [
     body('email')
          .exists().withMessage(validation.required)
          .isEmail().withMessage(validation.email)
          .custom(validation.uniqueEmail),
     body('password')
          .exists().withMessage(validation.required)
          .isLength({ min: 6 }).withMessage(validation.min.string.replace(':min', 6)),
     body('name')
          .exists().withMessage(validation.required)
]
