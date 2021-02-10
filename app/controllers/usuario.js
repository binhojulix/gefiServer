const Usuario = require('../models/usuario')
const { validaUsuario, validateLogin } = require('../middleware/validator/fieldsValidator.middleware')
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
     
    app.post(rota,  validaUsuario,
         (req, res)=>{

        if(checkValidation(req, res)){
            return;
        }

        var usuario = req.body;
    
        usuario.senha =  hashPassword("GEFI");

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
      (req, res) => {

        if(checkValidation(req, res)){
            return;
        }

        const { login, senha: pass } = req.body;
      

       // const user =  Usuario.findOne(login);
    
        const user = {login:'fabiolu', 
        senha:'$2a$10$g5vKP8oDXYWm0hC7YYiHsuflPm2gPoZccTzIH9Q/COiOiueE5Yciy', nome:'fabio', id:12, role_fk:1};

        if (!user) {
            throw new HttpException(401, 'Login indisponivel!');
        }

        compareSenha(pass, user.senha);


        
        const secretKey = process.env.SECRET || "";

        
        const token = jwt.sign({ id: user.id.toString() }, secretKey, {
            expiresIn : 60*5*1
        });

        user.auth = true;
        user.privilegio = getPermission(user);
        const { senha, ...usuarioSemSenha } = user;
        res.send({ ...usuarioSemSenha, token });
    
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

    
    app.patch(rota, validaUsuario,
        (req, res)=>{
        this.checkValidation(req);
        var usuario = req.body;
        console.log(`${rotaName} atualizar`);
        Usuario.atualiza(res, usuario);
    });


    app.delete(rotaParametro, (req, res)=>{
        const id = parseInt(req.body.id);
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

    hashPassword = (senha) => {
        let hash = bcrypt.hashSync(senha, 10);
        return hash;
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