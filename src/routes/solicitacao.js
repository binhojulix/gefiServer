const Router = require('express');
const solicitacaoContoller = require('../controllers/solicitacao');
const router = Router()

const rota = `/solicitacoes`;
router.post(rota, solicitacaoContoller.adiciona);
router.get(rota, solicitacaoContoller.lista);
router.get(`${rota}:/id`, solicitacaoContoller.buscaPorId);
router.get(`${rota}:/area/id`, solicitacaoContoller.buscaPorArea);
router.patch(`${rota}`, solicitacaoContoller.atualiza);
router.get(`${rota}:/usuario/id`, solicitacaoContoller.buscaPorUsuario);
router.delete('/:id', solicitacaoContoller.deleta);

module.exports = router;


