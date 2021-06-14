const router = require('express').Router();

const { create, getAll, getById, update } = require('../controllers/request');
const { isAuthenticated } = require('../middlewares/authorization');

router.post('/', isAuthenticated, create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);

module.exports = router;
