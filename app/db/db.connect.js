const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

const userModel = require('../models/User.model');
const gameModel = require('../models/Game.model');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`
    ),
      (err, res) => {
        console.log(res);
      };
  } catch (error) {
    console.log(error);
  }
};
connectDB();

const User = userModel(sequelize, Sequelize);
const Game = gameModel(sequelize, Sequelize);

// sequelize.sync({ force: false });
// console.log('tables updated');

module.exports = { User, Game };
