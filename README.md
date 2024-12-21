# Aplicatia pentru crearea meniului - examen

## 1. Proiectare

### 1.1. Arhitectura aplicatiei

#### Models (definite in `models/`):

- Category (pentru categorii)
- MenuItem (pentru elementele de meniu)

#### Views (definite in `views/`):

- addCategory.pug (formular de adaugare pentru categorii)
- listCategories.pug (listare categorii)
- addMenuItem.pug (formular de adaugare pentru menu items)
- listMenuItems.pug (listare menu items)
- home.pug (linkuri spre listare categorii si listare menu items)

#### Controllers (definite in `controllers/`):

CategoryController (CRUD pentru categorii)
MenuItemController (CRUD pentru elemente de meniu)

### 1.2. Tehnologii utilizate

#### Stack

- Node.js
- Express.js
- SQLite
- Sequelize
- Pug

#### Librarii

- Method override
- Body parser
- Nodemon

### 1.3. Schema bazei de date

Schema bazei de date este in imaginea `screenshots/db.png`

### 1.4. Tipuri de stocare

- Baza de date: Folosim SQLite pentru date structurate
- Stocare fisiere: Nu este necesara in aceasta aplicatie
- Stocare in cloud: Neimplementat, dar daca aplicatia creste, se poate folosi

### 1.5. Date pentru cache

In aceasta aplicatie simpla nu e neaparat necesar cache-uirea datelor. Daca am cache-ui ceva, ar fi lista categoriilor, pentru ca nu se schimba foarte des

## 2. Pasii pentru crearea proiectului

1. Initializarea proiectului si instalarea dependentelor
2. Crearea structurii de directoare si fisiere
3. Definirea modelelor, view-urilor, controlerelor si rutelor
4. Pornirea aplicatiei cu `npm start`

## 3. Metode din controlere

`controllers/MenuItemController.js`

- salvare

```js
async create(req, res) {
  try {
    validateMenuItemData(req.body);
    const { name, price, description, categoryId } = req.body;
    await MenuItem.create({ name, price, description, categoryId });
    return res.redirect("/menu-items");
  } catch (err) {
    return res.status(400).send(err.message);
  }
},
```

- modificare

```js
async update(req, res) {
  try {
    validateMenuItemData(req.body);
    const menuItem = await MenuItem.findByPk(req.params.id);
    if (!menuItem) {
      return res.status(404).send("MenuItem not found");
    }
    const { name, price, description, categoryId } = req.body;
    await menuItem.update({ name, price, description, categoryId });
    return res.redirect("/menu-items");
  } catch (err) {
    return res.status(400).send(err.message);
  }
},
```

- stergere

```js
async delete(req, res) {
  try {
    const menuItem = await MenuItem.findByPk(req.params.id);
    if (!menuItem) {
      return res.status(404).send("MenuItem not found");
    }
    await menuItem.destroy();
    return res.redirect("/menu-items");
  } catch (err) {
    return res.status(500).send(err.message);
  }
},

```

## 4. Validarea datelor

```js
function validateMenuItemData(data) {
  if (!data.name || !data.name.trim()) {
    throw new Error('Name is required');
  }
  if (!data.price || isNaN(data.price)) {
    throw new Error('Price must be a valid number');
  }
}
```

## 5. Vizualizarile

Toate vizualizarile sunt in folderul `views/`

## 6. Modelele

Toate modelele sunt in folderul `models/`

## 7. Migratiile

Codul pentru migrare este in folderul `migrations/`

## 8. Rutele

Rutele sunt in folderul `routes/`

## 9. Screenshot al aplicatiei

Screenshoturile aplicatiei sunt in folderul `screenshots/`
