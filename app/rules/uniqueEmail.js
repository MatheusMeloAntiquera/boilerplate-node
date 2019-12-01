import { User }  from '../models/';
import { validation } from '~/lang/translate';

export default (email) => {

    return User.findOne({ where: { email } }).then(user => {
        if (user) {
            return Promise.reject(validation.emailUnique);
        }
    });
};