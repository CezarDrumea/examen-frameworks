const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');

function validateMenuItemData(data) {
  if (!data.name || data.name.trim().length === 0) {
    throw new Error('Name is required');
  }
  if (!data.price || isNaN(data.price)) {
    throw new Error('Price must be a valid number');
  }
}

module.exports = {
  async create(req, res) {
    try {
      validateMenuItemData(req.body);
      const { name, price, description, categoryId } = req.body;
      await MenuItem.create({ name, price, description, categoryId });
      return res.redirect('/menu-items');
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  async list(req, res) {
    try {
      const menuItems = await MenuItem.findAll({
        include: { model: Category, as: 'Category' },
      });
      return res.render('listMenuItems', { menuItems });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  async getById(req, res) {
    try {
      const menuItem = await MenuItem.findByPk(req.params.id, {
        include: { model: Category, as: 'Category' },
      });
      if (!menuItem) {
        return res.status(404).send('MenuItem not found');
      }
      return res.json(menuItem);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  async update(req, res) {
    try {
      validateMenuItemData(req.body);
      const menuItem = await MenuItem.findByPk(req.params.id);
      if (!menuItem) {
        return res.status(404).send('MenuItem not found');
      }

      const { name, price, description, categoryId } = req.body;
      await menuItem.update({ name, price, description, categoryId });
      return res.redirect('/menu-items');
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  async delete(req, res) {
    try {
      const menuItem = await MenuItem.findByPk(req.params.id);
      if (!menuItem) {
        return res.status(404).send('MenuItem not found');
      }
      await menuItem.destroy();
      return res.redirect('/menu-items');
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
};
