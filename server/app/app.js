import cors from 'cors';
import express from 'express';

import { router as loginRouter } from './routes/login.routes.js';
import { router as registerRouter } from './routes/register.routes.js';

const app = express();

app.use(cors('http://localhost:5001'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to homepage');
});

app.use('/api/v1/users', registerRouter);
app.use('/api/v1/auth', loginRouter);

export default app;
