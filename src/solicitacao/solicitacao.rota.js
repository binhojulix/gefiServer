const express = require('express');
const router = express.Router();
const solicitacaoContoller = require('./solicitacao.controller');


router.post('/', solicitacaoContoller.adiciona);
router.get('/', solicitacaoContoller.lista);
router.get('/:id', solicitacaoContoller.buscaPorId);
router.get('/area/:id', solicitacaoContoller.buscaPorArea);
router.patch('/', solicitacaoContoller.atualiza);
router.get('/usuario/:id', solicitacaoContoller.buscaPorUsuario);
router.delete('/:id', solicitacaoContoller.deleta);

module.exports = router;


