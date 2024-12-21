const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = require('./Category');

const MenuItem = sequelize.define('MenuItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

MenuItem.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'Category',
});
Category.hasMany(MenuItem, {
  foreignKey: 'categoryId',
  as: 'menuItems',
});

module.exports = MenuItem;
