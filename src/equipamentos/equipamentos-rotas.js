const equipamentoControlador = require('./equipamentos-controlador');
const { middlewaresAutenticacao } = require('../usuarios');

module.exports = app => {
  app
    .route('/equipamento')
    .get(equipamentoControlador.lista)
    .post(
      middlewaresAutenticacao.bearer,
      equipamentoControlador.adiciona
    );
};
