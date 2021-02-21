const AreaModelo = require('./area.model');
const { InternalServerError, InvalidArgumentError } = require('../utils/erros');
const validacoes = require('../utils/validador');



class Area {

    constructor(area) {
        this.id = area.id;
        this.descricao = area.descricao;
        this.sigla = area.sigla;
        this.valida();
    }

    async adiciona() {
        if (await Area.buscaPorSigla(this.sigla)) {
            throw new InvalidArgumentError('Área já existe');
        }
        const { id } = await new AreaModelo(this).save();
        this.id = id;
    }

    
    valida() {
        validacoes.campoStringNaoNulo(this.sigla, "sigla");
        validacoes.campoStringNaoNulo(this.descricao, "descricao");
    }


    static async deleta(id) {
        return await AreaModelo.destroy({ where: { id: id } });
    }

    static async buscaPorId(id) {
        const area = await AreaModelo.findByPk(id);
        if (!area) {
            return null;
        }
        return new Area(area);
    }

    
    static async buscaPorSigla(sigla) {
        const area = await AreaModelo.findOne({ 
            where: { sigla: sigla} 
        });
        if (!area) {
            return null;
    }
        return new Area(area);
    }

  

    static lista() {
        return AreaModelo.findAll();
    }

  
}

module.exports = Area;


