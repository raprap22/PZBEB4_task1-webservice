const express = require('express');
const appMiddleware = require('./middleware');
const routes = require('./routes');
const fs = require('fs');

const app = express();

const dataFile = './data.json';

if (fs.existsSync(dataFile)) {
  const data = fs.readFileSync(dataFile);
  app.locals.data = JSON.parse(data);
} else {
  app.locals.data = {};
  fs.writeFileSync(dataFile, '{}');
}

app.use(appMiddleware);
app.use('/data', routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Aplikasi berjalan di http://localhost:${port}`);
});

module.exports = app;
