const SolicitacaoModelo = require('./solicitacao.model');


class Solicitacao {

    constructor(solicitacao) {

        this.id = solicitacao.id;
        this.data_solicitacao = solicitacao.data_solicitacao;
        this.data_devolucao = solicitacao.data_devolucao;
        this.isAtivo = solicitacao.isAtivo;

    }

    async adiciona() {
        const { id } = await new SolicitacaoModelo(this).save();
        this.id = id;
    }


    static async deleta(id) {
        return await SolicitacaoModelo.destroy({ where: { id: id } });
    }

    static async buscaPorId(id) {
        const solicitacao = await SolicitacaoModelo.findByPk(id);
        if (!solicitacao) {
            return null;
        }
        return new Solicitacao(solicitacao);
    }

    
    static async buscaPorArea(area) {
        const solicitacao = await SolicitacaoModelo.findAll({ 
            where: {area: [area]}, include: ['area']
        });
        if (!solicitacao) {
            return null;
    }
        return new Solicitacao(solicitacao);
    }

    static async buscaPorUsuario(responsavel) {
        const solicitacao = await SolicitacaoModelo.findAll({ 
            where: {responsavel: [responsavel]}, include: ['area']
        });
        if (!solicitacao) {
            return null;
    }
        return new Solicitacao(solicitacao);
    }



    static lista() {
        return SolicitacaoModelo.findAll({include: ['Usuario', 'Equipamento']});
    }

   
}

module.exports = Solicitacao;


