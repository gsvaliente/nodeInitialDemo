require('dotenv').config();
const http = require('http');

const app = require('./app');
const { dbConnection } = require('./config/db.config');

const server = http.createServer(app);

const startServer = async () => {
  try {
    await dbConnection();
    server.listen(
      process.env.PORT,
      console.log(`listening on port ${process.env.PORT}...`)
    );
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
