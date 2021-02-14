const Equipamento = require('../models/equipamento')
const { InvalidArgumentError } = require('../utils/erros');
const validacoes = require('../utils/validador');


module.exports = (app) => {

   
    const rota = `/equipamentos`;
    const rotaParametro =`${rota}/:id`;
    const rotaName = `rota - equipamento:`;
    const campos ={
        descricao : `descricao`,
    }
    
    //ok
    app.post(rota, 
        (req, res)=>{
       // valida(req.body);
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

    
    app.patch(rota, (req, res)=>{
        valida(req.body);
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


    valida =(equipamento)=>{
        validacoes.campoStringNaoNulo(equipamento.descricao, 'descricao');

   }

 

}