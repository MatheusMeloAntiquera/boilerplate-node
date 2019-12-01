import { Router } from 'express';
import { validateRequest } from '../app/requests/validator';
import { SignUpRequest, LoginRequest } from '../app/requests/';
import { UserController } from '../app/controllers/';
import { ValidTokenMiddleware } from '../app/middlewares';
import Passport from '~/config/passport';

const middlewaresAuth = [
    Passport.authenticate('jwt', { session: false }), ValidTokenMiddleware
];

//Routes 
const routes = Router();
routes.post('/signup', validateRequest(SignUpRequest), async (req, res) => {
    return UserController.signup(req, res);
});

//Login
routes.post('/login', validateRequest(LoginRequest), (req, res) => {
    return UserController.login(req, res);
});

//Logout
routes.post('/logout', middlewaresAuth, (req, res) => {
    return UserController.logout(req, res);
});

routes.route('/user')
    .all(middlewaresAuth)
    .get(UserController.profile);

export default routes;