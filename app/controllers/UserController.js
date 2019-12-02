import { User, Token } from '../models';
import { UserRepository, TokenRepository } from '../respositories';
import EncryptHelper from '../helpers/EncryptHelper';
import Jwt from 'jsonwebtoken';
import Translator from '~/lang/translate';

const signup = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const user = await UserRepository.save({
            name: name,
            email: email,
            password: EncryptHelper.encryptString(password)
        });

        const token = await TokenRepository.save({
            access_token_id: returnToken(user),
        });

        return res.status(201).json({
            success: true,
            token: token.access_token_id
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        });
    }


};

const login = (req, res) => {
    const { email, password } = req.body;

    User.scope('withPassword').findOne({ where: { email } }).then(user => {

        if (!user) {
            return res.status(401).json({
                success: false,
                error: Translator.auth.emailInvalid
            });
        }

        if (!EncryptHelper.compareString(password, user.password)) {
            return res.status(401).json({
                success: false,
                error: Translator.auth.passwordIncorrect
            });
        }

        //Save Token
        Token
            .build({ access_token_id: returnToken(user) })
            .save()
            .then(token => {
                return res.status(200).json({ success: true, token: token.access_token_id });
            })
            .catch(error => {
                return res.status(500).json({
                    success: false,
                    error
                });
            });


    });

};

const logout = (req, res) => {
    console.log(req.token);
    Token.update(
        { revoked: true },
        {
            where: { access_token_id: req.token }
        }).then(() => {
            return res.status(200).json({
                success: true,
                message: 'Logout with successfully'
            });
        })
        .catch(error => {
            return res.status(500).json({
                success: false,
                error
            });
        });

};

const returnToken = (user) => {
    return Jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

const profile = (req, res) => {
    return res.status(200).json({ success: true, 'data': req.user });
};

export default { signup, login, logout, profile };
