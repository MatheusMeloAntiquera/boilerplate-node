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
                message: "ok",
                token: returnToken(user)
            })
        }).catch((error) => {
            return res.status(500).json({
                message: "fail",
                error
            })
        });

    }

    const login = (req, res) => {
        const { email, password } = req.body;

        UserModel.scope('withPassword').findOne({ where: { email } }).then(user => {

            if (!user) {
                return res.status(401).json({
                    "message": "fail",
                    "error": app.translator.auth.emailInvalid
                })
            }

            if (!encryptHelper.compareString(password, user.password)) {
                return res.status(401).json({
                    "message": "fail",
                    "error": app.translator.auth.passwordIncorrect
                })
            }
            return res.status(200).json({ message: "ok", token: returnToken(user) });
        })

    }

    const returnToken = (user) => {
        return app.jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    }

    const profile = (req, res) => {
        return res.status(200).json({ message: "ok", "data": req.user })
    }

    return { signup, login, profile }
}