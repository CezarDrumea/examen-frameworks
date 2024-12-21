const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const sequelize = require('./db');
const Category = require('./models/Category');
const MenuItem = require('./models/MenuItem');

const mainRouter = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home');
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/add-category', (req, res) => {
  res.render('addCategory');
});
app.get('/add-menu-item', (req, res) => {
  res.render('addMenuItem');
});

app.use('/', mainRouter);

sequelize.sync().then(() => app.listen(3000));
