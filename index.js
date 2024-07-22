const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuración de la base de datos
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT)");
});

// Rutas básicas
app.get('/', (req, res) => {
  res.send('Hola, Mundo!');
});

// Crear un Elemento (CREATE)
/*
  curl -X POST http://localhost:3000/items \
     -H "Content-Type: application/json" \
     -d '{"name": "Nuevo Item", "description": "Descripción del nuevo item"}'
**/
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.run(query, [name, description], function(err) {
    if (err) {
      console.error('Error creando el item:', err);
      res.status(500).send('Error creando el item');
      return;
    }
    res.status(201).send(`Item creado con ID: ${this.lastID}`);
  });
});

// Leer Todos los Elementos (READ)
// curl -X GET http://localhost:3000/items
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error obteniendo los items:', err);
      res.status(500).send('Error obteniendo los items');
      return;
    }
    res.json(rows);
  });
});

// Leer un Elemento por ID (READ)
// curl -X GET http://localhost:3000/items/1
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM items WHERE id = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Error obteniendo el item:', err);
      res.status(500).send('Error obteniendo el item');
      return;
    }
    if (!row) {
      res.status(404).send('Item no encontrado');
      return;
    }
    res.json(row);
  });
});

// Actualizar un Elemento (UPDATE)
/*
  curl -X PUT http://localhost:3000/items/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Item Actualizado", "description": "Descripción actualizada del item"}'
**/
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  db.run(query, [name, description, id], function(err) {
    if (err) {
      console.error('Error actualizando el item:', err);
      res.status(500).send('Error actualizando el item');
      return;
    }
    if (this.changes === 0) {
      res.status(404).send('Item no encontrado');
      return;
    }
    res.send('Item actualizado');
  });
});

// Eliminar un Elemento (DELETE)
// curl -X DELETE http://localhost:3000/items/1
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM items WHERE id = ?';
  db.run(query, [id], function(err) {
    if (err) {
      console.error('Error eliminando el item:', err);
      res.status(500).send('Error eliminando el item');
      return;
    }
    if (this.changes === 0) {
      res.status(404).send('Item no encontrado');
      return;
    }
    res.send('Item eliminado');
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

