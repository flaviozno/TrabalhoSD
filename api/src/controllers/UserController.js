const UserService = require('../services/user');
const AdminService = require('../services/admin');
class UserController {
    async show(req, res) {
        const { id } = req.params;

        const response = await UserService.getUserById({ id });

        return res.json(response);
    }

    async store(req, res) {
        const { email, username, password } = req.body;

        const { id } = await AdminService.GenerateUserID({
            email
        })

        if (id) {
            const response = await UserService.registerUser({
                id, email, username, password
            });
            return res.json(response);
        }
    }

    async delete(req, res) {
        const { id } = req.body;

        const response = await UserService.deleteUser({ id });

        return res.json(response);
    }
}

module.exports = new UserController();
