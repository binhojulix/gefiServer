const Usuario = require('../models/usuario')
const { InvalidArgumentError } = require('../utils/erros');
const validacoes = require('../utils/validador');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



module.exports = (app) => {

    app.post('/autenticar', async (req, res, next) => {
        console.log("autenticar")
      valida(req.body);

      const { login, senha: pass } = req.body;
      const user =  await Usuario.buscaPorLogin(login);

      if (!user) {
          res.status(401).json({"Erro": "Usuário inválido"});
      }
      const isMatch = await bcrypt.compare(pass, user.senha);
    
      if (!isMatch) {
          res.status(401).json({"Erro": "Senha invalida"});
      }

      const secretKey = process.env.SECRET || "";
      const token = jwt.sign({ id: user.id.toString() }, secretKey, {
          expiresIn : 60*5*1
      });

      user.auth = true;
      const { senha, ...usuarioSemSenha } = user;
      res.send({ ...usuarioSemSenha, token });
  });


    app.post('/logout', (req, res)=>{
        res.json({ auth: false, token: null });
    });

    valida =(user)=>{
        validacoes.campoStringNaoNulo(user.login, 'login');
        validacoes.campoStringNaoNulo(user.senha, 'senha');
   }
    
   
}