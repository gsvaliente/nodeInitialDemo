const { join } = require('path');
const express = require('express');

const app = express();

app.use(express.static(join(__dirname, 'public')));

const PORT = 5001;

app.listen(PORT, console.log(`listening on port ${PORT}...`));
