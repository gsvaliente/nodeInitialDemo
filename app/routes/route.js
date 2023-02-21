const Router = require('express');

const gameRouter = require('./game.routes');
const rankingRouter = require('./ranking.routes');
const userRouter = require('./user.routes');

module.exports = { gameRouter, rankingRouter, userRouter };
