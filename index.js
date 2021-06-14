const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');

const routes = require('./src/routes');
const populateDb = require('./src/utils/populateDb')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// populateDb();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
