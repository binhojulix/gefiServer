const Router = require('express');
const areaController = require('../controllers/area');
const router = Router()

const rota = `/areas`;
router.post(rota, areaController.adiciona);
router.patch(rota, areaController.atualiza);
router.get(rota, areaController.lista);
router.get(`${rota}/:id`, areaController.buscaPorId);
router.delete(`${rota}/:id`, areaController.deleta);

module.exports = router;


