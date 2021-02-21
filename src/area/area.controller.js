const Area = require('./area.dao');
const { InvalidArgumentError, HttpException } = require('../utils/erros');



module.exports = {

  async adiciona(req, res) {
    const { descricao, sigla } = req.body;
    try {
      const area = new Area({
        descricao,
        sigla
      });
      await area.adiciona();
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
            const areas = await Area.lista();
            if (!areas.length) {
                throw new HttpException(404, 'Nenhuma área encontrada encontrado');
            }
            res.json(areas);
            } catch (erro) {
                res.status(500).json({ erro: erro.message });
        }
    },

    async buscaPorId(req, res) {
        try {
            const area = await Area.buscaPorId(req.params.id);
            if(!area){
                throw new HttpException(404, 'Área não encontrado');
            }
            res.json(area);
        } catch (erro) {
            res.status(500).json({ erro: erro.message });
        }
    },



    async deleta(req, res) {
        const id = req.params.id;
        try {
            await Area.deleta(id);
            res.status(200).json();
        } catch (erro) {
            res.status(500).json({ erro: erro });
        }
    },
  
};



