const ControleModelo = require('./controle.model');


class Controle {

    constructor(controle) {

        this.id = controle.id;
        this.data_falha = controle.data_falha;
        this.data_validacao = controle.data_validacao;
        this.motivo_falha = controle.motivo_falha;
        this.resolucao_da_falha = controle.resolucao_da_falha;
        this.isAtivo = controle.isAtivo;

    }

    async adiciona() {
        const { id } = await new ControleModelo(this).save();
        this.id = id;
    }


    static async deleta(id) {
        return await ControleModelo.destroy({ where: { id: id } });
    }

    static async buscaPorId(id) {
        const controle = await ControleModelo.findByPk(id);
        if (!controle) {
            return null;
        }
        return new Controle(controle);
    }

    
    static async buscaPorReponsavel(responsavel) {
        const controle = await ControleModelo.findAll({ 
            where: {responsavel: [responsavel]}, include: ['motivo_falha']
        });
        if (!controle) {
            return null;
    }
        return new Controle(Controle);
    }


    static lista() {
        return ControleModelo.findAll({include: ['Usuario', 'Equipamento']});
    }

   
}

module.exports = Controle;


