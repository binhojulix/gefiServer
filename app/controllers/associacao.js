const Associacao = require('../models/associacao')

module.exports = (app) => {

    const rota = `/associacoes`;
    const rotaParametro =`${rota}/:id`;
    const rotaName = `rota - associacao:`;
 
    app.post(rota, (req, res)=>{
        var associacao = req.body;
        console.log(`${rotaName} salvar`);
        Associacao.adiciona(res, associacao);

    });

    app.get(rota, (req, res)=>{
        console.log(`${rotaName} listar`);
        Associacao.lista(res);
    });

    app.get(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} pesquisar`);
        Associacao.pesquisaPorId(res, id);
    });

    
    app.patch(rota, (req, res)=>{
        var associacao = req.body;
        console.log(`${rotaName} atualizar`);
        Associacao.atualiza(res, associacao);
    });


    app.delete(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} deletar`);
        Associacao.deleta(res, id);
    });

}