
module.exports = app => {

    const controllers = app.controllers;
    const requests = app.requests;

    const { validateRequest } = app.requests.validator;

    const middlewaresAuth = [
        app.passport.authenticate('jwt', { session: false }), app.middlewares.valid_token
    ];

    //Register route
    app.post('/signup', validateRequest(requests.signup), async (req, res) => {
        return await controllers.user.signup(req, res);
    });

    //Login
    app.post('/login', validateRequest(requests.login), (req, res) => {
        return controllers.user.login(req, res);
    });

    //Logout
    app.post('/logout', middlewaresAuth, (req, res) => {
        return controllers.user.logout(req, res);
    });

    app.route('/user')
        .all(middlewaresAuth)
        .get(controllers.user.profile)
}