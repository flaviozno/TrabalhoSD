const { Router } = require('express')

const UserController = require('./controllers/UserController')
const SessionController = require('./controllers/SessionController')

const authMiddleware = require('./middlewares/auth');

const router = Router();

router.get('/users/:id', UserController.show);
router.post('/users', UserController.store)
router.post('/delete', UserController.delete)

router.post('/sessions', SessionController.store)

router.use(authMiddleware);

module.exports = router;