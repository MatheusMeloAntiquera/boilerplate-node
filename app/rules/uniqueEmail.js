module.exports = app => (email) => {
    User = app.models.user;
    return User.findOne({ where: { email: email}}).then(user => {
        if (user) {
            return Promise.reject(app.translator.validation.emailUnique);
        }
    });
}