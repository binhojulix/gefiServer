const Area = require('./areas-modelo');
const { InvalidArgumentError } = require('../erros');

module.exports = {
  async adiciona(req, res) {
    try {
      const area = new Area(req.body);
      await area.adiciona();

      res.status(201).json(Area);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        return res.status(400).json({ erro: erro.message });
      }
      res.status(500).json({ erro: erro.message });
    }
  },

  async lista(req, res) {
    try {
      const Areas = await Area.lista();
      res.json(Areas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }


  
};
