import { validationResult } from 'express-validator';

const validateRequest = validations => async (req, res, next) => {

    const errorFormatter = ({ location, msg, param }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        const newMsg = msg.replace(':param', param);
        return `[${location}.${param}]: ${newMsg}`;
    };

    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
        return next();
    }

    res.status(422).json({
        success: false,
        errors: errors.array()
    });
};

export { validateRequest }