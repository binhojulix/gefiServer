const database = require('../models');
const validacoes = require('../utils/validador');
const { InvalidArgumentError, HttpException } = require('../utils/erros');

class ControleController {

  static async adiciona(req, res) {
    const novoControle = req.body;

    try {
      const novoControleCriada = await database.Controles.create(novoControle)
      return res.status(200).json(novoControleCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

    static async lista(req, res){
      try {
        const controles = await database.Controles.findAll(
          { include: [database.Areas, database.Equipamentos, database.Usuarios]}
        );
        if (!controles.length) {
          throw new HttpException(404, 'Nenhuma controle encontrada encontrado');
      }
        return res.status(200).json(controles)  
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    static async buscaPorId(req, res) {
      const { id } = req.params
      try {
        const Controle = await database.Controles.findOne( { 
          where: { 
            id: Number(id) 
          }
        });

        if(!Controle){
          throw new HttpException(404, 'controle não encontrado');
      }
        return res.status(200).json(umaPessoa)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    static async buscaPorUsuario(req, res) {
      const { usuario } = req.params
      try {
        const controle = await database.Controles.findOne( { 
          where: { 
            usuario: Number(usuario) 
          }
        });

        if(!controle){
          throw new HttpException(404, 'Controle não encontrada');
      }
        return res.status(200).json(umaPessoa)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }


    static async buscaPorArea(req, res) {
      const { area } = req.params
      try {
        const controle = await database.Controles.findOne( { 
          where: { 
            id: area
          }
        });

        if(!controle){
          throw new HttpException(404, 'Controle não encontrada');
      }
        return res.status(200).json(umaPessoa)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }


    static async atualiza(req, res) {
      const { id } = req.params
      const novosInfos = req.body
      try {
        await database.Controle.update(novosInfos, { 
          where: { 
            id: Number(id)
          }})
        const ControleAtualizada = await database.Controles.findOne( { where: { id: Number(id) }})
        return res.status(200).json(ControleAtualizada)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }


  static async deleta(req, res) {
    const { id } = req.params
    try {
      await database.Controles.destroy({ where: { id: Number(id) }})
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}


module.exports = ControleController



