require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const passport = require('passport');
const passportJWT = require('passport-jwt');

module.exports = app => {

    passport.use(new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, (jwtPayload, done) => {
        app.models.user.findByPk(jwtPayload.id).then(user => {
            
            if (!user) { return done(null, false); }
            return done(null, user);
        }).catch(error => {
            return done(error)
        });
    }
    ));

    app.use(passport.initialize())
    app.passport = passport

}

