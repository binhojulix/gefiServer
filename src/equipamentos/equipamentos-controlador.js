const Equipamento = require('./equipamentos-modelo');
const { InvalidArgumentError } = require('../erros');

module.exports = {
  async adiciona(req, res) {
    try {
      const Equipamento = new Equipamento(req.body);
      await Equipamento.adiciona();

      res.status(201).json(Equipamento);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message });
      }
      res.status(500).json({ erro: erro.message });
    }
  },

  async lista(req, res) {
    try {
      const Equipamentos = await Equipamento.lista();
      res.json(Equipamentos);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }


  
};
