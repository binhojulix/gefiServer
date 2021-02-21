const express = require('express');
const router = express.Router();
const areaController = require('./area.controller');


router.post('/', areaController.adiciona);
router.get('/', areaController.lista);
router.get('/:id', areaController.buscaPorId);
router.delete('/:id', areaController.deleta);

module.exports = router;


