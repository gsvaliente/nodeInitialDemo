import { join } from 'path';
import * as url from 'url';

import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static(join(__dirname, 'public')));

app.listen(
  process.env.PORT,
  console.log(`client listening on port ${process.env.PORT}...`)
);
