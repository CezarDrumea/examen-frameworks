const Category = require('../models/Category');

function validateCategoryData(data) {
  if (!data.name || data.name.trim().length === 0) {
    throw new Error('Category name is required');
  }
}

module.exports = {
  async create(req, res) {
    try {
      validateCategoryData(req.body);
      const { name } = req.body;
      await Category.create({ name });
      return res.redirect('/categories');
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  async list(req, res) {
    try {
      const categories = await Category.findAll();
      return res.render('listCategories', { categories });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  async getById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).send('Category not found');
      }
      return res.json(category);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  async update(req, res) {
    try {
      validateCategoryData(req.body);
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).send('Category not found');
      }
      const { name } = req.body;
      await category.update({ name });
      return res.redirect('/categories');
    } catch (err) {
      return res.status(400).send(err.message);
    }
  },

  async delete(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).send('Category not found');
      }
      await category.destroy();
      return res.redirect('/categories');
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
};
