const Router = require('express');
const controleController = require('../controllers/controle');
const router = Router()

const rota = `/controles`;
router.post(rota, controleController.adiciona);
router.patch(rota, controleController.atualiza);
router.get(rota, controleController.lista);
router.get(`${rota}/:id`, controleController.buscaPorId);
router.delete(`${rota}/:id`, controleController.deleta);


module.exports = router;


