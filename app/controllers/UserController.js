import { UserService } from '../services';

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    UserService.signup(name, email, password).then(
        user => {
            return res.status(201).json({
                success: true,
                user
            });
        }
    ).catch(error => {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    });

};

const login = (req, res) => {
    const { email, password } = req.body;

    UserService.login(email, password).then(
        token => {
            return res.status(200).json({
                success: true,
                token
            });
        }
    ).catch(error => {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    });

};

const logout = (req, res) => {

    UserService.revokeToken(req.token).then(() => {
            return res.status(200).json({
                success: true,
                message: 'Logout with successfully'
            });
        })
        .catch(error => {
            return res.status(500).json({
                success: false,
                error
            });
        });

};



const profile = (req, res) => {
    return res.status(200).json({ success: true, 'data': req.user });
};

export default { signup, login, logout, profile };
