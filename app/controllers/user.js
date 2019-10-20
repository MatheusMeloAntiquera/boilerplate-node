module.exports = app => {
    const UserModel = app.models.user;
    const register = (req, res) => {

        const data = req.body;
        UserModel.create({
            name: data.name,
            email: data.email,
            password: data.password
        }).then(user => {
            return res.status(200).json({
                "message": "ok",
                "data": user
            })
        }).catch((error) => {
            return res.status(500).json({
                "message": "fail",
                "error": error
            })
        });

    }

    return {
        register
    }
}