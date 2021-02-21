const EquipamentoModelo = require('./equipamento.model');
const { InternalServerError, InvalidArgumentError } = require('../utils/erros');
const validacoes = require('../utils/validador');
const Sequelize = require('sequelize');

class Equipamento {

    constructor(equipamento) {
        this.id = equipamento.id;
        this.descricao = equipamento.descricao;
        this.fabricante = equipamento.fabricante;
        this.modelo = equipamento.modelo;
        this.isAtivo = equipamento.isAtivo;
        this.valida();
    }

    async adiciona() {
        if (await Equipamento.buscaPorCodigoCptm(this.codigo_cptm)) {
            
            throw new InvalidArgumentError('O equipamento já existe!');
        }
        const { id } = await new EquipamentoModelo(this).save();
        this.id = id;
    }


    valida() {
        validacoes.campoStringNaoNulo(this.descricao, 'descricao');
        validacoes.campoStringNaoNulo(this.codigo_cptm, 'codigo_cptm');
    }


    static async deleta(id) {
        return await EquipamentoModelo.destroy({ where: { id: id } });
    }

    static async buscaPorId(id) {
        const equipamento = await EquipamentoModelo.findByPk(id);
        if (!equipamento) {
            return null;
        }
        return new Equipamento(equipamento);
    }

    
   
    static async buscaPorCodigoCptm(codigo_cptm) {
        const equipamento = await EquipamentoModelo.findOne({ where: 
                Sequelize.or(
                    { codigo_cptm: codigo_cptm})
             
            });
        if (!equipamento) {
            return null;
    }
 
        return new Equipamento(equipamento);
    }


    static lista() {
        return EquipamentoModelo.findAll();
    }

 
}

module.exports = Equipamento;


