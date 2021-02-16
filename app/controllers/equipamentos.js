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
    
    //ok
    app.post(rota, validaEquipamento,
        (req, res)=>{
    
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).json(erros);
            return;
        }
        var equipamento = req.body;
        console.log(`${rotaName} salvar`);
        Equipamento.adiciona(res, equipamento);

    });

    //ok
    app.get(rota, (req, res)=>{
        console.log(`${rotaName} listar`);
        Equipamento.lista(res);
    });

    //ok
    app.get(rotaParametro, (req, res)=>{
        const id = parseInt(req.params.id);
        console.log(`${rotaName} pesquisar`);
        Equipamento.pesquisarPorId(res, id);
    });

    
    app.patch(rota, validaEquipamento,
        (req, res)=>{
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).json(erros);
            return;
        }
        var equipamento = req.body;
        id = equipamento.id;
        delete equipamento.id;
        console.log(`${rotaName} atualizar`);
        Equipamento.atualiza(res, equipamento, id);
    });


    app.delete(rotaParametro, (req, res)=>{
        const id = parseInt(req.params.id);
        console.log(`${rotaName} deletar`);
        Equipamento.deleta(res, id);
    });

 

}