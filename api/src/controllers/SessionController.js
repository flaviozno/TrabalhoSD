const UserService = require('../services/user');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const response = await UserService.loginUser({
      user: { email, password },
    });

    return res.json(response);
  }
}

module.exports = new SessionController();
