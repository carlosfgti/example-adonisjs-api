# API Restful AdonisJS

Fist, clone project:

```bash
git clone https://github.com/carlosfgti/example-adonisjs-api.git

cd example-adonisjs-api/

npm install
```

### Migrations

File .env define access:
```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=name_database
```

```js
adonis migration:run
```

### Run

Start project:
```bash
adonis serve --dev
```
