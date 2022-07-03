const AdminService = require('../services/admin');

class AdminController {
    async show(req, res) {
        const { id } = req.params;

        const response = await AdminService.GetAdminByIdRequest({ id });

        return res.json(response);
    }
    async store(req, res) {
        const { email, username, password } = req.body;

        const response = await AdminService.RegisterAdminRequest({
            admin: { email, username, password },
        });

        return res.json(response);
    }
    async delete(req, res) {
        const { email } = req.body;

        const response = await AdminService.DeleteUser({ email });
        
        return res.json(response);
    }

}

module.exports = new AdminController();