import { genSaltSync, hashSync, compareSync } from 'bcrypt-nodejs';

const encryptString = (string) => {
    const salt = genSaltSync(10);
    return hashSync(string, salt);
};

const compareString = (string, hash) => {
    return compareSync(string, hash);
};

export default { encryptString, compareString };