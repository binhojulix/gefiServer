const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { InvalidArgumentError } = require('../utils/erros');
const validacoes = require('../utils/validador');


dotenv.config();

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
    
     //ok
    app.post(rota, async (req, res, next)=>{

        SalvaUsuario(req.body);
        var usuario = req.body;
        usuario.senha = await bcrypt.hash("gefi", 8);
        usuario.trocar_senha = 1;
        console.log(`${rotaName} salvar`);
        Usuario.adiciona(res, usuario);

    });


    

    //ok
    app.get(rota, (req, res)=>{
        console.log(`${rotaName} listar`);
        Usuario.lista(res);
    });


    //ok
    app.get(rotaParametro, (req, res)=>{
        const id = parseInt(req.params.id);
        console.log(`${rotaName} pesquisar`);
        Usuario.pesquisarPorId(res, id);
    });

    //ok
    app.patch(rota,(req, res)=>{
        var usuario = req.body;
        id = usuario.id;
        delete usuario.id;
        console.log(`${rotaName} atualizar`);
        Usuario.atualiza(res, usuario, id);
    });

    //ok
    app.delete(rotaParametro, (req, res)=>{
        const id = parseInt(req.params.id);
        console.log(`${rotaName} deletar`);
        Usuario.deleta(res, id);
    });

 
    SalvaUsuario =(user)=>{
        validacoes.campoStringNaoNulo(user.nome, 'nome');
        validacoes.campoStringNaoNulo(user.login, 'login');
   }
  
}