const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user.routes');
const uploadRouter = require('./routes/upload.routes');
const timeRouter = require('./routes/time.routes');
const pokemonRouter = require('./routes/pokemon.routes');
const pageNotFound = require('./middlewares/not-found.middleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/time', timeRouter);
app.use('/pokemon', pokemonRouter);

app.use(pageNotFound);

const PORT = 3000;
app.listen(PORT, console.log(`listening on port ${PORT}...`));
