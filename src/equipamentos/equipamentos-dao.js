const db = require('../../database');
const { InternalServerError } = require('../erros');

const { promisify } = require('util');
const dbRun = promisify(db.run).bind(db);
const dbAll = promisify(db.all).bind(db);

module.exports = {
  async adiciona(equipamento) {
    try {
      await dbRun(`INSERT INTO equipamentos (descricao, fabricante, modelo, codigoCPTM) VALUES (?, ?, ? ,?)`, [
        equipamento.descricao,
        equipamento.fabricante,
        equipamento.modelo,
        equipamento.codigoCPTM
      ]);
    } catch (erro) {
      throw new InternalServerError('Erro ao adicionar o Equipamento!');
    }
  },

  async lista() {
    try {
      return await dbAll(`SELECT * FROM equipamentos`);
    } catch (erro) {
      throw new InternalServerError('Erro ao listar os equipamentos!');
    }
  }
};
