const express = require('express');
const router = express.Router();
const controleController = require('./controle.controller');


router.post('/', controleController.adiciona);
router.patch('/', controleController.atualiza);
router.get('/', controleController.lista);
router.get('/:id', controleController.buscaPorId);
router.delete('/:id', controleController.deleta);


module.exports = router;


