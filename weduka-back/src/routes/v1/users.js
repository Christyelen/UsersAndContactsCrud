const { Router } = require('express');
const { create, list, remove, update } = require('../../controllers/users');
const contacts = require('./contacts');

const router = Router();

router.post('/', create);
router.get('/', list);
router.delete('/:userId', remove);
router.patch('/:userId', update);

router.use(contacts);

module.exports = router;
