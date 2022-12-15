const express = require('express')
const path = require('path');
const sockets = require('../server/sockets/sockets');
const app = express();

const port = 3000


//Archivos estáticos
app.use('/', express.static('public'))

app.listen(port, () => {
  console.log(`Xat client running on http://localhost:${port}`)
});