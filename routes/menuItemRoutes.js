const express = require('express');
const router = express.Router();
const MenuItemController = require('../controllers/MenuItemController');

router.post('/', MenuItemController.create);

router.get('/', MenuItemController.list);
router.get('/:id', MenuItemController.getById);

router.put('/:id', MenuItemController.update);

router.delete('/:id', MenuItemController.delete);

module.exports = router;
