const usuariosDao = require('./usuarios-dao');
const { InvalidArgumentError } = require('../erros');
const validacoes = require('../validacoes-comuns');
const bcrypt = require('bcrypt');

class Usuario {
  constructor(usuario) {

    this.id = usuario.id;
    this.nome = usuario.nome;
    this.matricula = usuario.matricula;
    this.login = usuario.login;
    this.privilegio  = usuario.privilegio;
    this.area = parseInt(usuario.area);
    this.senhaHash = usuario.senhaHash;
    this.valida();
  }

  async adiciona() {
    const userValidate = await Usuario.buscaPorLoginMatricula(this.login, this.matricula);
    console.log(userValidate)
    if (userValidate) {
      throw new InvalidArgumentError('O usuário já existe, !');
    }
    console.log(this)
    await usuariosDao.adiciona(this);
    const { id } = await usuariosDao.buscaPorLogin(this.login);
    this.id = id;
  }

  async adicionaSenha(senha) {
    validacoes.campoTamanhoMinimo(senha, 'senha', 8);
    validacoes.campoTamanhoMaximo(senha, 'senha', 64);
   



    this.senhaHash = await Usuario.gerarSenhaHash(senha);
  }

  valida() {
    validacoes.campoTamanhoPermitido(this.matricula, 'matricula', 9);
    validacoes.campoStringNaoNulo(this.nome, 'nome');
    validacoes.campoStringNaoNulo(this.matricula, 'matricula');
    validacoes.campoStringNaoNulo(this.login, 'login');
    validacoes.campoIntegerNaoNulo(this.area, 'area');
  }


  async deleta() {
    return usuariosDao.deleta(this);
  }

  static async buscaPorId(id) {
    const usuario = await usuariosDao.buscaPorId(id);
    if (!usuario) {
      return null;
    }

    return new Usuario(usuario);
  }

  static async buscaPorLogin(login) {
    const usuario = await usuariosDao.buscaPorLogin(login);
    if (!usuario) {
      return null;
    }

    return new Usuario(usuario);
  }

  static async buscaPorLoginMatricula(login, matricula) {
    const usuario = await usuariosDao.buscaPorLoginMatricula(login, matricula);
    if (!usuario) {
      return null;
    }

    return new Usuario(usuario);
  }




  static lista() {
    return usuariosDao.lista();
  }

  static gerarSenhaHash(senha) {
    const custoHash = 12;
    return bcrypt.hash(senha, custoHash);
  }
}

module.exports = Usuario;
