const router = require('express').Router();

const { create, login, update, getAll, getById, getByIdWithDoctor, search } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/authorization');

router.post('/register', create);
router.post('/login', login);
router.get('/', isAuthenticated, getAll);
router.get('/:id', isAuthenticated, getById);
router.get('/:id', isAuthenticated, getByIdWithDoctor);
router.put('/:id', isAuthenticated, update);
router.get('/search/:searchTerm', isAuthenticated, search);

module.exports = router;
