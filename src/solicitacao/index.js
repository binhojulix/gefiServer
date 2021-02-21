const express = require('express');
const router = express.Router();
const solicitacaoRota = require('./solicitacao.rota');

router.use('/solicitacoes', solicitacaoRota);
module.exports = router;