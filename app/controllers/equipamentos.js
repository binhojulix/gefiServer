const Equipamento = require('../models/equipamento')

module.exports = (app) => {

   
    const rota = `/equipamentos`;
    const rotaParametro =`${rota}/:id`;
    const rotaName = `rota - equipamento:`;
    const campos ={
        descricao : `descricao`,
    }
    
    app.post(rota, (req, res)=>{
        var equipamento = req.body;
        req.assert(`${campos.descricao}`, `campo ${campos.descricao} obrigatório`).notEmpty();
        var erros = req.validationErrors();
        if(erros) {
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

    
    app.patch(rota, (req, res)=>{
        var equipamento = req.body;
        req.assert(`${campos.descricao}`, `campo ${campos.descricao} obrigatório`).notEmpty();
        var erros = req.validationErrors();
        if(erros) {
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