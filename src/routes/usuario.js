const Router = require('express');
const usuarioController = require('../controllers/usuario');
const router = Router()

const rota = `/usuarios`;
router.post(rota, usuarioController.adiciona);
router.patch(rota, usuarioController.atualiza);
router.post(`${rota}/autenticar`, usuarioController.login);
router.get(rota, usuarioController.lista);
router.get(`${rota}:/id`, usuarioController.buscaPorId);
router.delete(`${rota}:/id`, usuarioController.deleta);

module.exports = router




