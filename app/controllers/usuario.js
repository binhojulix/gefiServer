const Usuario = require('../models/usuario')
const { validaUsuario, validateLogin, validaAtualizacaoUsuario } = require('../middleware/validator/fieldsValidator.middleware')
const { validationResult } = require('express-validator');
const UserRole = require(`../utils/userRoles.utils`);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const HttpException = require('../utils/HttpExceptions.utils');


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
    app.post(rota,  validaUsuario,
         async (req, res, next)=>{

        if(checkValidation(req, res)){
            return;
        }
        var usuario = req.body;
       
        usuario.senha = await bcrypt.hash("gefi", 8);

        privilegio = usuario.privilegio.toUpperCase();

        if(privilegio === UserRole.Admin){
            usuario.role_fk = 1;
        }else if(privilegio === UserRole.Gestor){
            usuario.role_fk = 2;
        }else{
            usuario.role_fk = 3;
        }

        delete usuario.privilegio;

        console.log(`${rotaName} salvar`);
        Usuario.adiciona(res, usuario);

    });


    app.post('/autenticar', validateLogin, 
      async (req, res, next) => {

        if(checkValidation(req, res)){
            return;
        }
        const { login, senha: pass } = req.body;
        const user =  await Usuario.buscaPorLogin(login);
        if (!user) {
             throw new InternalServerError('Não foi possível encontrar o usuário!');
        }
        const secretKey = process.env.SECRET || "";
        const token = jwt.sign({ id: user.id.toString() }, secretKey, {
            expiresIn : 60*5*1
        });

        user.auth = true;
        user.role = getPermission(user);
        delete user.role_fk;
        const { senha, ...usuarioSemSenha } = user;
        res.send({ ...usuarioSemSenha, token });
    });


    //ok
    app.get(rota, (req, res)=>{
        console.log(`${rotaName} listar`);
        Usuario.lista(res);
    });


    //ok
    app.get(rotaParametro, (req, res)=>{
        const id = parseInt(req.params.id);
        console.log(id)
        console.log(`${rotaName} pesquisar`);
        Usuario.pesquisarPorId(res, id);
    });

    //ok
    app.patch(rota, validaAtualizacaoUsuario,
        (req, res)=>{
        if(checkValidation(req, res)){
            return;
        }
        var usuario = req.body;
        privilegio = usuario.privilegio.toUpperCase();

        if(privilegio === UserRole.Admin){
            usuario.role_fk = 1;
        }else if(privilegio === UserRole.Gestor){
            usuario.role_fk = 2;
        }else{
            usuario.role_fk = 3;
        }
        id = usuario.id;
        delete usuario.privilegio;
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



    checkValidation = (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).json(erros);
            return true;
        }
    }


    compareSenha =(senha, hash) =>{
        retorno;
        bcrypt.compare(senha, hash, function(err, result) {
            if(result == true){
                retorno = true;
            }
        });
        return retorno;
    }


    getPermission = (usuario)=>{
        switch (usuario.role_fk){
            case 1:
                usuario.privilegio = UserRole.Admin;
                break;
            case 2:
                usuario.privilegio = UserRole.Gestor;
                break;
            case 3:
                usuario.privilegio = UserRole.User;
                break;

        }
        return usuario.privilegio;
    }

  
}