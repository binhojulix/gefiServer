const database = require('../models');
const validacoes = require('../utils/validador');
const { InvalidArgumentError, HttpException } = require('../utils/erros');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize')



class UsuarioController {


  static async adiciona(req, res) {

    const novoUsuario = req.body;
    validacoes.campoStringNaoNulo(novoUsuario.nome, 'nome');
    validacoes.campoStringNaoNulo(novoUsuario.matricula, 'matricula');
    validacoes.campoStringNaoNulo(novoUsuario.login, 'login');
    try {
      if (await UsuarioController.buscaPorLoginMatricula(novoUsuario.login, novoUsuario.matricula,)) {
        throw new InvalidArgumentError('O usuário já existe!');
      }
      novoUsuario.senha = await UsuarioController.gerarSenhaHash('gefi');
      const novoUsuarioCriado = await database.Usuarios.create(novoUsuario)
      return res.status(200).json(novoUsuarioCriado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

    static async lista(req, res){
      try {
        const usuarios = await database.Usuarios.findAll(
          {include: [database.Areas]}
        );
        if (!usuarios.length) {
          throw new HttpException(404, 'Nenhum usuario  encontrado');
      }
        return res.status(200).json(usuarios)  
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    static async buscaPorId(req, res) {
      const { id } = req.params
      try {
        const Usuario = await database.Usuarios.findOne( { 
          where: { 
            id: Number(id) 
          }
        });

        if(!Usuario){
          throw new HttpException(404, 'usuario não encontrado');
      }
        return res.status(200).json(umaPessoa)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }


    static async buscaPorLoginMatricula(login, matricula) {
      const usuario = await database.Usuarios.findOne({ where: 
              Sequelize.or(
                  { login: login },
                  { matricula: matricula })
           
          });
      if (!usuario) {
          return null;
  }

      return usuario;
  }

  static async buscaPorLogin(login) {
    const usuario = await database.Usuarios.findOne({ where: 
            Sequelize.or(
                { login: login })
         
        });
    if (!usuario) {
        return null;
}

    return new Usuario(usuario);
}

    static async atualiza(req, res) {
      const { id } = req.params
      const novosInfos = req.body
      validacoes.campoStringNaoNulo(this.nome, 'nome');
      validacoes.campoStringNaoNulo(this.matricula, 'matricula');
      validacoes.campoStringNaoNulo(this.matricula, 'login');
      
      try {
        await database.Usuarios.update(novosInfos, { 
          where: { 
            id: Number(id)
          }})
        const UsuarioAtualizada = await database.Usuarios.findOne( { where: { id: Number(id) }})
        return res.status(200).json(UsuarioAtualizada)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }


  static async deleta(req, res) {
    const { id } = req.params
    try {
      await database.Usuarios.destroy({ where: { id: Number(id) }})
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }


 static async login(req, res) {
    const { login, senha: pass } = req.body;
    const user = await UsuarioController.buscaPorLogin(login);
    if (!user) {
        res.status(401).json({"Erro": "Usuário inválido"});
    }
 
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
  }

  async logout(req, res) {
   
   /* try {
      const token = req.token;
      await tokens.access.invalida(token);
      res.status(204).json();
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }*/
  }
  static gerarSenhaHash(senha) {
    const custoHash = 12;
    return bcrypt.hash(senha, custoHash);
}

}

module.exports = UsuarioController;















