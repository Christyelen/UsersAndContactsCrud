const { Router } = require('express');
const { create, remove, update } = require('../../controllers/contacts');

const router = Router();

router.post('/:userId/contacts', create);
router.delete('/:userId/contacts/:contactId', remove);
router.patch('/:userId/contacts/:contactId', update);

module.exports = router;
