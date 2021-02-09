const CentroDeCusto = require('../models/centroDeCusto');


module.exports = (app) => {

   
    const rota = `/centrodecustos`;
    const rotaParametro =`${rota}/:id`;
    const rotaName = `rota - centrodecusto:`;
 
    app.post(rota, (req, res)=>{
        var centrodecusto = req.body;
        console.log(`${rotaName} salvar`);
        CentroDeCusto.adiciona(res, centrodecusto);
 
    });

    app.get(rota, (req, res)=>{
        console.log(`${rotaName} listar`);
        CentroDeCusto.lista(res);
    });

    app.get(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} pesquisar`);
        CentroDeCusto.pesquisaPorId(res, id);
    });

    
    app.patch(rota, (req, res)=>{
        var centrodecusto = req.body;
        console.log(`${rotaName} atualizar`);
        CentrosDeCusto.atualiza(res, centrodecusto);
    });


    app.delete(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} deletar`);
        CentroDeCusto.deleta(res, id);
    });
 

}