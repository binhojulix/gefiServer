const Usuario = require('../models/usuario')
const { validaUsuario, validateLogin, validaAtualizacaoUsuario } = require('../middleware/validator/fieldsValidator.middleware')
const { validationResult } = require('express-validator');
const UserRole = require(`../utils/userRoles.utils`);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const HttpException = require('../utils/HttpExceptions.utils');

module.exports = (app) => {

    app.post('/autenticar', validateLogin, 
      async (req, res, next) => {

        if(checkValidation(req, res)){
            return;
        }

        const { login, senha: pass } = req.body;
        const user = await Usuario.getUserByLogin(login)

        if (!user) {
            res.status(401).json({erros:'Login indisponivel'});
            return;
        }
        const isMatch = await bcrypt.compare(pass, user.senha);

        if (!isMatch) {
            res.status(401).json({erros:'Senha incorreta'});
            return;
        }

        const secretKey = process.env.SECRET || "";
        const token = jwt.sign({ id: user.id.toString() }, secretKey, {
            expiresIn : 60*5*1
        });
        user.auth = true;
        user.privilegio = getPermission(user);
        const { senha, ...usuarioSemSenha } = user;
        res.send({ ...usuarioSemSenha, token });
    });


   
    app.post('/logout', (req, res)=>{
        res.json({ auth: false, token: null });
    });


    checkValidation = (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).json(erros);
            return true;
        }
    }
   
}