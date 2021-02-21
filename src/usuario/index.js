const express = require('express');
const router = express.Router();
const usuarioRotas = require('./usuario.rota');

router.use('/usuarios', usuarioRotas);
module.exports = router;