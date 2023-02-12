import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import { dbConnect } from './config/dbConnect.js';

dotenv.config();

const server = http.createServer(app);

const PORT = 8080;

const startServer = async () => {
  await dbConnect();
  server.listen(PORT, console.log(`listening on port ${PORT}...`));
};

startServer();
