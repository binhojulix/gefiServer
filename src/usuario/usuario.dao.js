const UsuarioModelo = require('./usuario.model');
const { InternalServerError, InvalidArgumentError } = require('../utils/erros');
const validacoes = require('../utils/validador');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Area = require('../area/area.model');
class Usuario {

    constructor(usuario) {
        console.log("primeiro")
        console.log(usuario)
        this.id = usuario.id;
        this.nome = usuario.nome;
        this.matricula = usuario.matricula;
        this.login = usuario.login;
        this.senha = usuario.senha;
        this.isAtivo = usuario.isAtivo;

        this.areaId = {
            id: usuario.area.id,
            sigla: usuario.area.sigla,
            descricao: usuario.area.descricao
        }
        console.log("area")
            console.log(this.area)

        this.valida();
    }

    async adiciona() {
        if (await Usuario.buscaPorLoginMatricula(this.login, this.matricula)) {
            
            throw new InvalidArgumentError('O usuário já existe!');
        }
        console.log(this)
        const { id } = await new UsuarioModelo(this).save();
        this.id = id;
    }

    async adicionaSenha(senha) {
        this.senha = await Usuario.gerarSenhaHash(senha);
    }


    valida() {
        validacoes.campoStringNaoNulo(this.nome, 'nome');
        validacoes.campoStringNaoNulo(this.matricula, 'matricula');
        validacoes.campoStringNaoNulo(this.matricula, 'login');
    }


    static async deleta(id) {
        console.log("fui chamado")
        return await UsuarioModelo.destroy({ where: { id: id } });
    }

    static async buscaPorId(id) {
        const usuario = await UsuarioModelo.findByPk(id);
        if (!usuario) {
            return null;
        }
        return new Usuario(usuario);
    }

    
    static async buscaPorLogin(login) {
        const usuario = await UsuarioModelo.findAll({ 
            where: {login: [login]}, include: ['login']
        });


        if (!usuario) {
            return null;
    }
        console.log("retorno")
        console.log(usuario)
        return new Usuario(usuario);
    }

    static async buscaPorLoginMatricula(login, matricula) {
        const usuario = await UsuarioModelo.findOne({ where: 
                Sequelize.or(
                    { login: login },
                    { matricula: matricula })
             
            });
        if (!usuario) {
            return null;
    }
 
        return new Usuario(usuario);
    }


    static lista() {
        return UsuarioModelo.findAll({include: [Area]});
    }

    static gerarSenhaHash(senha) {
        const custoHash = 12;
        return bcrypt.hash(senha, custoHash);
    }
}

module.exports = Usuario;


