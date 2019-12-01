import { body } from 'express-validator';
import { validation } from '~/lang/translate';

export default [
     body('email')
          .exists().withMessage(validation.required),
     body('password')
          .exists().withMessage(validation.required)
];