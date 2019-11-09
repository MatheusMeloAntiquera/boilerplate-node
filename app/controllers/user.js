require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

module.exports = app => {
    const UserModel = app.models.user;
    const encryptHelper = app.helpers.encrypt;
    const signup = (req, res) => {

        const { name, email, password } = req.body;
        UserModel.create({
            name: name,
            email: email,
            password: encryptHelper.encryptString(password)
        }).then(user => {

            return res.status(201).json({
                success: true,
                token: returnToken(user)
            })
        }).catch((error) => {
            return res.status(500).json({
                success: false,
                error
            })
        });

    }

    const login = (req, res) => {
        const { email, password } = req.body;

        UserModel.scope('withPassword').findOne({ where: { email } }).then(user => {

            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: app.translator.auth.emailInvalid
                })
            }

            if (!encryptHelper.compareString(password, user.password)) {
                return res.status(401).json({
                    success: false,
                    error: app.translator.auth.passwordIncorrect
                })
            }

            //Save Token
            app.models.token
                .build({ access_token_id: returnToken(user) })
                .save()
                .then(token => {
                    return res.status(200).json({ success: true, token: token.access_token_id });
                })
                .catch(error => {
                    return res.status(500).json({
                        success: false,
                        error
                    })
                })


        })

    }

    const logout = (req, res) => {
        app.models.token.update(
            { revoked: true },
            {
                where: { access_token_id: req.token }
            }).then(token => {
                return res.status(200).json({
                    success: true,
                    message: "Logout with successfully"
                })
            })
            .catch(error => {
                return res.status(500).json({
                    success: false,
                    error
                })
            });

    }

    const returnToken = (user) => {
        return app.jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    }

    const profile = (req, res) => {
        return res.status(200).json({ success: true, "data": req.user })
    }



    return { signup, login, logout, profile }
}