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
      

        Usuario.buscaPorLogin(login, function(result){
           const test = result;
           console.log(result)
        });


        const user = {login:'fabiolu', 
        senha:'$2a$08$aHrA8xn3vTfVxRYBrTihT.LpDl/v2uab.mtGwKUgoBUXkK3I2TA1a', nome:'fabio', id:12, role_fk:1};

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


   /*
    app.post('/autenticar', (req, res) => {

        login = req.body.login;
        senha = req.body.senha;
         
        console.log(`rota de autenticacao`);

        if(login && senha){
            const sql = `select  id_usuario, login, role_fk,
            trocar_senha, nome, matricula, ativo, departamento_fk
            from usuarios where login = ? and senha = ? `;

            conexao.query(sql, [login, senha], (erro, resultado)=>{
                if(erro){
                    res.status(400).json(erro);
                }else{
 
                    if(resultado.length > 0 ){
                        const id = resultado[0].id_usuario;
                        var token = jwt.sign({ id }, process.env.SECRET, {
                            expiresIn: 300 // expires in 5min
                          });

                        usuario = {};

                        usuario.id = resultado[0].id_usuario;
                        usuario.login = resultado[0].login;
                        usuario.role_fk = resultado[0].role_fk;
                        usuario.trocarSenha = resultado[0].trocar_senha;
                        usuario.departamento = resultado[0].departamento_fk;
                        usuario.token = token;
                        usuario.auth = true;
                        usuario.status = resultado[0].ativo;
                      
                        usuario.senha = "123";

                        switch (usuario.role_fk){
                            case 1:
                                usuario.privilegio = "ADMIN";
                                break;
                            case 2:
                                usuario.privilegio = "USER";
                                break;
                            case 3:
                                usuario.privilegio = "GESTOR";
                                break;

                        }
                        res.status(200).json(usuario);
                    }else{
                        res.status(500).json({message: 'Login inválido!'});
                    }
                    
                }
            });
        }
    });
     */

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