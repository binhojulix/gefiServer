const express = require('express');
const router = express.Router();
const areaRotas = require('./area.rota');

router.use('/areas', areaRotas);
module.exports = router;