const Usuario = require('./usuario.dao');
const { InvalidArgumentError, HttpException } = require('../utils/erros');
//const tokens = require('./utils/tokens');
const { buscaPorId } = require('./usuario.dao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function geraEndereco(rota, token) {
  const baseURL = process.env.BASE_URL;
  return `${baseURL}${rota}${token}`;
}

module.exports = {

  async adiciona(req, res) {
    
    const { nome, matricula, login, area} = req.body;
    const isAtivo = true;
  
    const senha = "gefi";
    try {
      const usuario = new Usuario({
        nome,
        matricula,
        login,
        senha,
        area,
        isAtivo
      });
   
      await usuario.adicionaSenha(senha);
      await usuario.adiciona();
      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message });
      }
      res.status(500).json({ erro: erro.message });
    }
  },




  async login(req, res) {
    const { login, senha: pass } = req.body;
    const user = await Usuario.buscaPorLogin(login);
    if (!user) {
        res.status(401).json({"Erro": "Usuário inválido"});
    }
    console.log(user)

    const isMatch = await bcrypt.compare(pass, user.senha);

    if (!isMatch) {
        res.status(401).json({"Erro": "Senha invalida"});
    }


    const secretKey = process.env.SECRET || "gefi";
    const token = jwt.sign({ id: user.id.toString() }, secretKey, {
        expiresIn : 60*5*1
    });

    user.auth = true;
    const { senha, ...usuarioSemSenha } = user;
    res.send({ ...usuarioSemSenha, token });
  },

  async logout(req, res) {
   
   /* try {
      const token = req.token;
      await tokens.access.invalida(token);
      res.status(204).json();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }*/
  },

    async lista(req, res) {
        try {
            const usuarios = await Usuario.lista();
            if (!usuarios.length) {
                throw new HttpException(404, 'Nenhum usuário encontrado');
            }
            res.json(usuarios);
            } catch (erro) {
                res.status(500).json({ erro: erro.message });
        }
    },

    async buscaPorId(req, res) {
        try {
            const usuario = await Usuario.buscaPorId(req.params.id);
            if(!usuario){
                throw new HttpException(404, 'Usuário não encontrado');
            }
            res.json(usuario);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },

    async atualiza(req, res) {
      const id = req.params.id;
      try {
          await Usuario.deleta(id);
          res.status(200).json();
      } catch (erro) {
          res.status(500).json({ erro: erro });
      }
  },


    async deleta(req, res) {
        const id = req.params.id;
        try {
            await Usuario.deleta(id);
            res.status(200).json();
        } catch (erro) {
            res.status(500).json({ erro: erro });
        }
    },
  
};



