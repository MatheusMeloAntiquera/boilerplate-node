import { User }  from '../models';
import { validation } from '~/lang/translate';

export default async (email) => {

    return User.findOne({ email }).then(user => {
        if (user) {
            return Promise.reject(validation.emailUnique);
        }
    });
};