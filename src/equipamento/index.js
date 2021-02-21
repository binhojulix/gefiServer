const express = require('express');
const router = express.Router();
const equipamentoRotas = require('./equipamento.rota');

router.use('/equipamentos', equipamentoRotas);
module.exports = router;