const UserService = require('../services/user');

class UserController {
    async show(req, res) {
        const { id } = req.params;

        const response = await UserService.getUserById({ id });

        return res.json(response);
    }

    async store(req, res) {
        const { email, username, password } = req.body;

        const response = await UserService.registerUser({
            user: { email, username, password },
        });

        return res.json(response);
    }

    async delete(req, res) {
        const { id } = req.body;

        const response = await UserService.deleteUser({id});

        return res.json(response);
    }
}

module.exports = new UserController();
