const Equipamento = require('./equipamento.dao');
const { InvalidArgumentError, HttpException } = require('../utils/erros');



module.exports = {

  async adiciona(req, res) {
    
    const { descricao, fabricante, codigo_cptm, modelo} = req.body;
    const isAtivo = true;
  
    try {
      const Equipamento = new Equipamento({
        descricao,
        fabricante,
        codigo_cptm,
        modelo,
        isAtivo
      });
   
      await Equipamento.adiciona();
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
            const equipamentos = await Equipamento.lista();
            if (!equipamentos.length) {
                throw new HttpException(404, 'Nenhum equipamento encontrado');
            }
            res.json(equipamentos);
            } catch (erro) {
                res.status(500).json({ erro: erro.message });
        }
    },

    async buscaPorId(req, res) {
        try {
            const equipamento = await Equipamento.buscaPorId(req.params.id);
            if(!equipamento){
                throw new HttpException(404, 'Equipamento não encontrado');
            }
            res.json(equipamento);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },

    async atualiza(req, res) {
      const id = req.params.id;
      try {
          await Equipamento.deleta(id);
          res.status(200).json();
      } catch (erro) {
          res.status(500).json({ erro: erro });
      }
  },


    async deleta(req, res) {
        const id = req.params.id;
        try {
            await Equipamento.deleta(id);
            res.status(200).json();
        } catch (erro) {
            res.status(500).json({ erro: erro });
        }
    },
  
};



