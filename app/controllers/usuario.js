const Usuario = require('../models/usuario')

module.exports = (app) => {
    
    const rota = `/usuarios`;
    const rotaParametro =`${rota}/:id`;
    const rotaName = `rota - usuario:`;
    const campos ={
        nome : `nome`,
        matricula :'matricula',
        login:`login`,
        privilegio:`privilegio`
    }
     
    app.post(rota, (req, res)=>{
        var usuario = req.body;
        req.assert(`${campos.nome}`, `campo ${campos.nome} obrigatório`).notEmpty();
        req.assert(`${campos.matricula}`, `campo ${campos.matricula} obrigatório`).notEmpty();
        req.assert(`${campos.login}`, `campo ${campos.login} obrigatório`).notEmpty();
        req.assert(`${campos.privilegio}`, `campo ${campos.privilegio} obrigatório`).notEmpty();
        var erros = req.validationErrors();
        if(erros) {
            res.status(400).json(erros);
            return;
        }
        usuario.senha = "gefi";
        if(privilegio==='ADMIN'){
            usuario.fk = 2;
        }else{
            usuario.fk = 3;
        }

        console.log(`${rotaName} salvar`);
        Usuario.adiciona(res, usuario);

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
        var usuario = req.body;
        req.assert(`${campos.nome}`, `campo ${campos.nome} obrigatório`).notEmpty();
        req.assert(`${campos.matricula}`, `campo ${campos.matricula} obrigatório`).notEmpty();
        req.assert(`${campos.login}`, `campo ${campos.login} obrigatório`).notEmpty();
        req.assert(`${campos.privilegio}`, `campo ${campos.privilegio} obrigatório`).notEmpty();
        var erros = req.validationErrors();
        if(erros) {
            res.status(400).json(erros);
            return;
        }
        console.log(`${rotaName} atualizar`);
        Usuario.atualiza(res, usuario);
    });


    app.delete(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
        console.log(`${rotaName} deletar`);
        Usuario.deleta(res, id);
    });


}