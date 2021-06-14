const router = require('express').Router();

const { create, getAll, getById } = require('../controllers/history');
const { isAuthenticated } = require('../middlewares/authorization');

router.post('/', isAuthenticated, create);
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;
