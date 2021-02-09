const Revisao = require('../models/revisao')
const autenticador	=	require('../middlewares/autenticador');

module.exports = (app) => {

    const rota = `/revisoes`;
    const rotaParametro =`${rota}/:id`;
    const rotaName = `rota - revisao:`;

    app.post(rota, (req, res)=>{
        var revisao = req.body;
        console.log(`${rotaName} salvar`);
        Revisao.adiciona(res, revisao);
 
    });
 
    app.get(rota, (req, res)=>{
        console.log(`${rotaName} listar`);
        Revisao.lista(res);
    });

    app.get(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} pesquisar`);
        Revisao.pesquisaPorId(res, id);
    });

    
    app.patch(rota, (req, res)=>{
        var revisao = req.body;
        console.log(`${rotaName} atualizar`);
        Revisao.atualiza(res, revisao);
    });


    app.delete(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} deletar`);
        Revisao.deleta(res, id);
    });
}