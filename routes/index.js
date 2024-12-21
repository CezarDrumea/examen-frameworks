const express = require('express');
const router = express.Router();

const categoryRoutes = require('./categoryRoutes');
const menuItemRoutes = require('./menuItemRoutes');

router.use('/categories', categoryRoutes);

router.use('/menu-items', menuItemRoutes);

module.exports = router;
