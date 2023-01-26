const express = require('express');

const getTime = require('../controllers/time.controllers');
const authorize = require('../middlewares/authorize.middleware');
const noCache = require('../middlewares/no-cache.middleware');

const router = express.Router();

router.route('/').post(noCache, authorize, getTime);

module.exports = router;
