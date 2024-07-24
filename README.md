
# CRUD Básico con Node.js y SQLite

Este es un ejemplo de una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) básica utilizando Node.js y SQLite. Este proyecto está diseñado para demostrar cómo construir una API RESTful simple con Express y una base de datos SQLite.

## Requisitos

- Node.js (https://nodejs.org/)
- npm (viene incluido con Node.js)

## Instalación

1. Clona este repositorio y accede a la carpeta creada:

```sh
git clone https://github.com/bcarlu/CRUD-basico-node-js-sqlite.git
cd nombre-del-repositorio
```

2. Instala las dependencias:

```sh
npm install
```

## Uso

1. Inicia el servidor:

```sh
node index.js
```

El servidor debería estar corriendo en `http://localhost:3000`.

## Endpoints

### Crear un nuevo item

- **URL**: `/items`
- **Método**: `POST`
- **Cuerpo de la solicitud**:

```json
{
  "name": "Nuevo Item",
  "description": "Descripción del nuevo item"
}
```

- **Ejemplo con cURL**:

```sh
curl -X POST http://localhost:3000/items \
     -H "Content-Type: application/json" \
     -d '{"name": "Nuevo Item", "description": "Descripción del nuevo item"}'
```

### Obtener todos los items

- **URL**: `/items`
- **Método**: `GET`

- **Ejemplo con cURL**:

```sh
curl -X GET http://localhost:3000/items
```

### Obtener un item por ID

- **URL**: `/items/:id`
- **Método**: `GET`

- **Ejemplo con cURL**:

```sh
curl -X GET http://localhost:3000/items/1
```

### Actualizar un item

- **URL**: `/items/:id`
- **Método**: `PUT`
- **Cuerpo de la solicitud**:

```json
{
  "name": "Item Actualizado",
  "description": "Descripción actualizada del item"
}
```

- **Ejemplo con cURL**:

```sh
curl -X PUT http://localhost:3000/items/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Item Actualizado", "description": "Descripción actualizada del item"}'
```

### Eliminar un item

- **URL**: `/items/:id`
- **Método**: `DELETE`

- **Ejemplo con cURL**:

```sh
curl -X DELETE http://localhost:3000/items/1
```

## Notas Importantes

1. **Elección de SQLite**: Esta aplicación utiliza SQLite por su simplicidad y facilidad de uso en aplicaciones ligeras o de desarrollo rápido. No requiere configuración de servidor, lo que lo hace ideal para entornos de desarrollo y pruebas.

2. **Uso de Express**: Express es un framework minimalista y flexible para aplicaciones Node.js, lo que facilita la construcción rápida de aplicaciones web y APIs RESTful.

3. **Estructura del Código**: La estructura del proyecto sigue una organización básica, adecuada para ejemplos simples y entrevistas de trabajo. En aplicaciones más grandes, es recomendable separar las rutas y la lógica de la base de datos en archivos o módulos independientes.

4. **Manejo de Errores**: Cada operación CRUD maneja errores adecuadamente para proporcionar retroalimentación útil y mejorar la robustez de la aplicación.

5. **Seguridad y Validación**: Este ejemplo es básico y no incluye validación de datos ni medidas de seguridad como la prevención de inyecciones SQL. En aplicaciones de producción, es crucial implementar estas prácticas.

6. **Escalabilidad**: Aunque SQLite es excelente para aplicaciones pequeñas, en un entorno de producción o aplicaciones más grandes, considera migrar a un sistema de bases de datos más robusto como MySQL o PostgreSQL.
