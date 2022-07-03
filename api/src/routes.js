const { Router } = require('express')

const UserController = require('./controllers/UserController')
const AdminController = require('./controllers/AdminController')

const SessionController = require('./controllers/SessionController')

const authMiddleware = require('./middlewares/auth');

const router = Router();

router.get('/users/:id', UserController.show)
router.post('/users', UserController.store)
router.post('/delete', AdminController.delete)
router.post('/admin', AdminController.store)
router.get('/admin/:id', AdminController.show)
router.post('/sessions', SessionController.store)

router.use(authMiddleware);



module.exports = router;