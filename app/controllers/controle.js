const Controle = require('../models/controle')
const { InvalidArgumentError } = require('../utils/erros');
const validacoes = require('../utils/validador');

module.exports = (app) => {

    const rota = `/controles`;
    const rotaParametro =`${rota}/:id`;
    const rotaName = `rota - controle:`;
 
    app.post(rota, (req, res)=>{
        var controle = req.body;
        console.log(`${rotaName} salvar`);
        Controle.adiciona(res, controle);
 
    });

    app.get(rota, (req, res)=>{
        console.log(`${rotaName} listar`);
        Controle.lista(res);
    });

    app.get(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} pesquisar`);
        Associacao.pesquisaPorId(res, id);
    });

    
    app.patch(rota, (req, res)=>{
        var controle = req.body;
        console.log(`${rotaName} atualizar`);
        Controle.atualiza(res, controle);
    });


    app.delete(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} deletar`);
        Controle.deleta(res, id);
    });

}