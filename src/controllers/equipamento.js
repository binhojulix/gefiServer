const database = require('../models');
const validacoes = require('../utils/validador');
const { InvalidArgumentError, HttpException } = require('../utils/erros');

class EquipamentoController {

  static async adiciona(req, res) {
    const novoEquipamento = req.body;
    console.log(novoEquipamento)
    validacoes.campoStringNaoNulo(novoEquipamento.descricao,'descricao');
    try {
      if (await EquipamentoController.buscaPorCodigoCptm(novoEquipamento.codigo_cptm)) {
        throw new InvalidArgumentError('O equipamento já existe!');
      }
      const novoEquipamentoCriado = await database.Equipamentos.create(novoEquipamento)
      return res.status(200).json(novoEquipamentoCriado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

 
  

  
    static async lista(req, res){
      try {
        const equipamentos = await database.Equipamentos.findAll();
        if (!equipamentos.length) {
          throw new HttpException(404, 'Nenhum equipamento  encontrado');
      }
        return res.status(200).json(equipamentos)  
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    static async buscaPorId(req, res) {
      const { id } = req.params
      try {
        const equipamento = await database.Equipamentos.findOne( { 
          where: { 
            id: Number(id) 
          }
        });

        if(!equipamento){
          throw new HttpException(404, 'Equipamento não encontrado');
      }
        return res.status(200).json(equipamento)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    static async buscaPorCodigoCptm(codigo_cptm) {
      try {
        const equipamento = await database.Equipamentos.findOne( { 
          where: { 
            codigo_cptm: codigo_cptm 
          }
        });
      
        return equipamento;
      } catch (error) {
        return null;
      }
    }

    static async atualiza(req, res) {
      const { id } = req.params
      const novosInfos = req.body
      validacoes.campoStringNaoNulo(novosInfos.descricao,'descricao');

      
      try {
        await database.Equipamentos.update(novosInfos, { 
          where: { 
            id: Number(id)
          }})
        const equipamentoAtualizado = await database.Equipamentos.findOne( { where: { id: Number(id) }})
        return res.status(200).json(equipamentoAtualizado)
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }


  static async deleta(req, res) {
    const { id } = req.params
    try {
      await database.Equipamentos.destroy({ where: { id: Number(id) }})
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}


module.exports = EquipamentoController



