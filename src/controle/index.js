const express = require('express');
const router = express.Router();
const controlesRota = require('./controle.rota');

router.use('/controles', controlesRota);
module.exports = router;