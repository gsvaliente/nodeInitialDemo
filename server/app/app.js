import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors('http://localhost:5001'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to homepage');
});

export default app;
