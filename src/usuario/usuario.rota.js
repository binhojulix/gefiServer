const express = require('express');
const router = express.Router();
const usuarioController = require('./usuario.controller');


router.post('/', usuarioController.adiciona);
router.patch('/', usuarioController.atualiza);
router.post('/autenticar', usuarioController.login);
router.get('/', usuarioController.lista);
router.get('/:id', usuarioController.buscaPorId);
router.delete('/:id', usuarioController.deleta);

module.exports = router;


