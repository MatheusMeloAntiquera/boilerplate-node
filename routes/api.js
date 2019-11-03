
module.exports = app => {

    const controllers = app.controllers;
    const requests = app.requests;

    const { validateRequest } = app.requests.validator;

    //Register route
    app.post('/signup', validateRequest(requests.signup), async (req, res) => {
        return await controllers.user.signup(req, res);
    });

    //Login
    app.post('/login', validateRequest(requests.login), (req, res) => {
        return controllers.user.login(req, res);
    });

    app.get('/profile', app.passport.authenticate('jwt', { session: false }), (req, res) => {
        controllers.user.profile(req, res);
    });
}