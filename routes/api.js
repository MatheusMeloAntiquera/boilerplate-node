import { Router } from 'express';
import { validateRequest } from '../app/requests/validator'
import  SignUpRequest  from '../app/requests/signup'
import { UserController } from '../app/controllers/user'

const routes = Router();

routes.post('/signup', validateRequest(SignUpRequest), async (req, res) => {
    return await UserController.signup(req, res);
});

export default routes;
// module.exports = app => {

//     const controllers = app.controllers;
//     const requests = app.requests;

//     const { validateRequest } = app.requests.validator;

//     const middlewaresAuth = [
//         app.passport.authenticate('jwt', { session: false }), app.middlewares.valid_token
//     ];

//     //Register route
//     app.post('/signup', validateRequest(requests.signup), async (req, res) => {
//         return await controllers.user.signup(req, res);
//     });

//     //Login
//     app.post('/login', validateRequest(requests.login), (req, res) => {
//         return controllers.user.login(req, res);
//     });

//     //Logout
//     app.post('/logout', middlewaresAuth, (req, res) => {
//         return controllers.user.logout(req, res);
//     });

//     app.route('/user')
//         .all(middlewaresAuth)
//         .get(controllers.user.profile)
// }