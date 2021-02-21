const Controle = require('./controle.dao');
const { InvalidArgumentError, HttpException } = require('../utils/erros');

module.exports = {

  async adiciona(req, res) {
    
    const { motivo_falha, resolucao_da_falha, isAtivo} = req.body;
    const data_falha = new Date();
    const data_validacao = new Date();

    try {
      const controle = new Controle({
        data_falha,
        data_validacao,
        motivo_falha,
        resolucao_da_falha,
        isAtivo
      });
      


   
      await controle.adiciona();
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
            const controles = await Controle.lista();
            if (controles.length) {
                throw new HttpException(404, 'Nenhuma associacao encontrada');
            }
            res.json(controles);
            } catch (erro) {
                res.status(500).json({ erro: erro.message });
        }
    },

    async buscaPorId(req, res) {
        try {
            const controle = await Controle.buscaPorId(req.params.id);
            if(!controle){
                throw new HttpException(404, 'Meus Equipamentos não encontrado');
            }
            res.json(controle);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },



    async deleta(req, res) {
        const id = req.params.id;
        try {
            await Controle.deleta(id);
            res.status(200).json();
        } catch (erro) {
            res.status(500).json({ erro: erro });
        }
    },

    async atualiza(req, res) {
      const id = req.params.id;
      try {
          await Controle.deleta(id);
          res.status(200).json();
      } catch (erro) {
          res.status(500).json({ erro: erro });
      }
  },
  
};



