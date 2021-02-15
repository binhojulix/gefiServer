const equipamentos = require('./src/equipamentos');
const usuarios = require('./src/usuarios');
const areas = require('./src/areas');

module.exports = app => {
  equipamentos.rotas(app);
  usuarios.rotas(app);
  areas.rotas(app);
};