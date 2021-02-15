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
  },

    async deleta(equipamento) {
      try {
        return await dbRun(`DELETE * FROM equipamentos WHERE ID = ?`,[
          equipamento.id
        ]);
      } catch (erro) {
        throw new InternalServerError('Erro ao deletar os equipamentos!');
      }
    },

    async atualiza(equipamento) {
      try {
        await dbRun(`update equipamentos set descricao = ?, fabricante = ?, modelo = ?, codigoCPTM = ? where id = ?`, [
          equipamento.descricao,
          equipamento.fabricante,
          equipamento.modelo,
          equipamento.codigoCPTM,
          equipamento.id
        ]);
      } catch (erro) {
        throw new InternalServerError('Erro ao atualizar o Equipamento!');
      }
    },

    async buscaPorId(id) {
      try {
        return await dbGet(`SELECT * FROM equiapmentos WHERE id = ?`, [id]);
      } catch (erro) {
        throw new InternalServerError('Não foi possível encontrar o equipamento!');
      }
    }
      
};
