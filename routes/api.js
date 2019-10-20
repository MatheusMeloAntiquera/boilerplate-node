
module.exports = app => {

    const controllers = app.controllers;
    const requests = app.requests;

    const { validateRequest } = app.requests.validator;

    //Register route
    app.post('/register', validateRequest(requests.register), async (req, res) => {
        return await controllers.user.register(req, res);
    });

    //Login and Logout routes 
}