import { User, Token } from '../models';
import Jwt from 'jsonwebtoken';
import EncryptService from './EncryptService'
import { auth } from '~/lang/translate';

class UserService {

    async insertUser(name, email, password) {

        return User.insert({
            name: name,
            email: email,
            password: EncryptService.encryptString(password)
        });

    }

    async login(email, password) {

        return User.findOne({ email }).then((user) => {
            if (!user) {
                throw auth.emailInvalid;
            }

            if (!EncryptService.compareString(password, user.password)) {
                throw auth.passwordIncorrect;
            }

            return Token.insert({
                access_token_id: this.returnToken(user)
            });
        });
    }

    async getUser(id) {
        return User.findById(id);
    }

    async revokeToken(token) {
        return Token.update({ access_token_id: token }, { revoked: true });
    }

    returnToken(user) {
        return Jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    }
}

export default new UserService;