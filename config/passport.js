require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
});

import { UserRepository } from '../app/respositories';

const passport = require('passport');
const passportJWT = require('passport-jwt');



passport.use(new passportJWT.Strategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, (jwtPayload, done) => {
    UserRepository.find(jwtPayload.id).then(user => {
        if (!user) { return done(null, false); }
        return done(null, user);
    }).catch(error => {
        return done(error);
    });
}
));

export default passport;


