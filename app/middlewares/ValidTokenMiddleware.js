import { Token } from '../models';
export default (req, res, next) => {

    Token.findOne({
        access_token_id: req.token,
        revoked: false,
    }).then(tokenValid => {
        if (!tokenValid) {
            return res.status(403).json({
                success: false,
                error: 'Token is Invalid'
            });
        } else {
            next();
        }
    }).catch(error => {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        });
    });
};

