const database = require('../models');
const validacoes = require('../utils/validador');
const { InvalidArgumentError, HttpException } = require('../utils/erros');

class SolicitacaoController {

  static async adiciona(req, res) {
    const novaSolicitacao = req.body;

    try {
      const novaSolicitacaoCriada = await database.Solicitacoes.create(novaSolicitacao)
      return res.status(200).json(novaSolicitacaoCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

    static async lista(req, res){
      try {
        const solicitacoes = await database.Solicitacoes.findAll(
          { include: [database.Areas, database.Equipamentos, database.Usuarios]}
        );
        if (!solicitacoes.length) {
          throw new HttpException(404, 'Nenhuma Solicitacao encontrada');
      }
        return res.status(200).json(solicitacoes)  
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    static async buscaPorId(req, res) {
      const { id } = req.params
      try {
        const Solicitacao = await database.Solicitacoes.findOne( { 
          where: { 
            id: Number(id) 
          }
        });

        if(!Solicitacao){
          throw new HttpException(404, 'Solicitacao não encontrada');
      }
        return res.status(200).json(umaPessoa)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    static async buscaPorUsuario(req, res) {
      const { usuario } = req.params
      try {
        const Solicitacao = await database.Solicitacoes.findOne( { 
          where: { 
            usuario: Number(usuario) 
          }
        });

        if(!Solicitacao){
          throw new HttpException(404, 'Solicitacao não encontrada');
      }
        return res.status(200).json(umaPessoa)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }


    static async buscaPorArea(req, res) {
      const { area } = req.params
      try {
        const Solicitacao = await database.Solicitacoes.findOne( { 
          where: { 
            id: area
          }
        });

        if(!Solicitacao){
          throw new HttpException(404, 'Solicitacao não encontrada');
      }
        return res.status(200).json(umaPessoa)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }


    static async atualiza(req, res) {
      const { id } = req.params
      const novasInfos = req.body
      try {
        await database.Solicitacoes.update(novasInfos, { 
          where: { 
            id: Number(id)
          }})
        const solicitacaoAtualizada = await database.Solicitacao.findOne( { where: { id: Number(id) }})
        return res.status(200).json(solicitacaoAtualizada)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }


  static async deleta(req, res) {
    const { id } = req.params
    try {
      await database.Solicitacoes.destroy({ where: { id: Number(id) }})
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}


module.exports = SolicitacaoController



