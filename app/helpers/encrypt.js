const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    function encryptString(string) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(string, salt)
    }

    function compareString(string, hash) {
        return bcrypt.compareSync(string, hash);
    }

    return { encryptString, compareString }
}