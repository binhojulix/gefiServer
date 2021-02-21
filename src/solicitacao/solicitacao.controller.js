const MeusEquipamentos = require('./solicitacao.dao');
const { InvalidArgumentError, HttpException } = require('../utils/erros');
const { buscaPorUsuario } = require('./solicitacao.dao');

module.exports = {

  async adiciona(req, res) {
    
    const { motivo_falha, resolucao_da_falha, isAtivo} = req.body;
    const data_falha = new Date();
    const data_validacao = new Date();

    try {
      const meusEquipamentos = new MeusEquipamentos({
        data_falha,
        data_validacao,
        motivo_falha,
        resolucao_da_falha,
        isAtivo
      });
   
      await meusEquipamentos.adiciona();
      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message });
      }
      res.status(500).json({ erro: erro.message });
    }
  },


    async lista(req, res) {
        try {
            const meusEquipamentoss = await MeusEquipamentos.lista();
            if (!meusEquipamentoss.length) {
                throw new HttpException(404, 'Nenhuma associacao encontrada');
            }
            res.json(meusEquipamentoss);
            } catch (erro) {
                res.status(500).json({ erro: erro.message });
        }
    },

    async buscaPorId(req, res) {
        try {
            const meusEquipamentos = await MeusEquipamentos.buscaPorId(req.params.id);
            if(!meusEquipamentos){
                throw new HttpException(404, 'Meus Equipamentos não encontrado');
            }
            res.json(meusEquipamentos);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },

    async buscaPorArea(req, res) {
      try {
          const meusEquipamentos = await MeusEquipamentos.buscaPorArea(req.params.id);
          if(!meusEquipamentos){
              throw new HttpException(404, 'Meus Equipamentos não encontrado');
          }
          res.json(meusEquipamentos);
      } catch (erro) {
          res.status(500).json({ erro: erro.message });
      }
  },

  async buscaPorUsuario(req, res) {
    try {
        const meusEquipamentos = await MeusEquipamentos.buscaPorUsuario(req.params.id);
        if(!meusEquipamentos){
            throw new HttpException(404, 'Meus Equipamentos não encontrado');
        }
        res.json(meusEquipamentos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
},


async atualiza(req, res) {
  const id = req.params.id;
  try {
      await MeusEquipamentos.deleta(id);
      res.status(200).json();
  } catch (erro) {
      res.status(500).json({ erro: erro });
  }
},




    async deleta(req, res) {
        const id = req.params.id;
        try {
            await MeusEquipamentos.deleta(id);
            res.status(200).json();
        } catch (erro) {
            res.status(500).json({ erro: erro });
        }
    },
  
};



