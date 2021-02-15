const areaControlador = require('./areas-controlador');

module.exports = app => {
  app
    .route('/area')
    .get(areaControlador.lista)
    .post(areaControlador.adiciona
    );
};
