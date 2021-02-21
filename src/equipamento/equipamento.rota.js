const express = require('express');
const router = express.Router();
const equipamentoController = require('./equipamento.controller');


router.post('/', equipamentoController.adiciona);
router.patch('/', equipamentoController.atualiza);
router.get('/', equipamentoController.lista);
router.get('/:id', equipamentoController.buscaPorId);
router.delete('/:id', equipamentoController.deleta);

module.exports = router;


