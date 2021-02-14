const equipamentos = require('./src/equipamentos');
const usuarios = require('./src/usuarios');

module.exports = app => {
  equipamentos.rotas(app);
  usuarios.rotas(app);
};