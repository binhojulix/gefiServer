const Equipamento = require('../models/equipamento')
const { validaEquipamento } = require('../middleware/validator/fieldsValidator.middleware')
const { validationResult } = require('express-validator');

module.exports = (app) => {

   
    const rota = `/equipamentos`;
    const rotaParametro =`${rota}/:id`;
    const rotaName = `rota - equipamento:`;
    const campos ={
        descricao : `descricao`,
    }
    
    app.post(rota, validaEquipamento,
        (req, res)=>{
        var equipamento = req.body;
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).json(erros);
            return;
        }
        console.log(`${rotaName} salvar`);
        Equipamento.adiciona(res, equipamento);

    });

    app.get(rota, (req, res)=>{
        console.log(`${rotaName} listar`);
        Equipamento.lista(res);
    });

    app.get(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} pesquisar`);
        Equipamento.pesquisaPorId(res, id);
    });

    
    app.patch(rota, validaEquipamento,
        (req, res)=>{
        var equipamento = req.body;
        check(`${campos.descricao}`, `campo ${campos.descricao} obrigatório`).notEmpty();
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).json(erros);
            return;
        }
        console.log(`${rotaName} atualizar`);
        Equipamento.atualiza(res, equipamento);
    });


    app.delete(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} deletar`);
        Equipamento.deleta(res, id);
    });

 

}