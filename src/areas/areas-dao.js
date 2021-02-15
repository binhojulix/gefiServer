const db = require('../../database');
const { InternalServerError } = require('../erros');

const { promisify } = require('util');
const dbRun = promisify(db.run).bind(db);
const dbAll = promisify(db.all).bind(db);

module.exports = {

  async adiciona(area) {
    try {
      await dbRun(`INSERT INTO areas (sigla, descricao) VALUES (?, ?)`, [
        area.sigla,
        area.descricao
      ]);
    } catch (erro) {
      throw new InternalServerError('Erro ao adicionar a area!');
    }
  },

  async lista() {
    try {
      return await dbAll(`SELECT * FROM areas`);
    } catch (erro) {
      throw new InternalServerError('Erro ao listar as areas!');
    }
  },

  
      
};
