const db = require('../../database');
const { InternalServerError } = require('../erros');

const { promisify } = require('util');
const dbRun = promisify(db.run).bind(db);
const dbGet = promisify(db.get).bind(db);
const dbAll = promisify(db.all).bind(db);

module.exports = {
  async adiciona(usuario) {
    try {
      await dbRun(
        `INSERT INTO usuarios (nome,  matricula, login, area_fk, privilegio, senhaHash) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          usuario.nome,
          usuario.matricula,
          usuario.login,
          usuario.area,
          usuario.privilegio,
          usuario.senhaHash
          
        ]
      );
    } catch (erro) {
      throw new InternalServerError('Erro ao adicionar o usuário!');
    }
  },

  async buscaPorId(id) {
    try {
      return await dbGet(`SELECT * FROM usuarios WHERE id = ?`, [id]);
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o usuário!');
    }
  },

  async buscaPorEmail(email) {
    try {
      return await dbGet(`SELECT * FROM usuarios WHERE email = ?`, [email]);
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o usuário!');
    }
  },

  async buscaPorArea(area_fk) {
    try {
      return await dbGet(`SELECT * FROM usuarios WHERE area_fk = ?`, [area_fk]);
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o usuário!');
    }
  },


  async buscaPorLogin(login) {
    try {
      return await dbGet(`SELECT * FROM usuarios WHERE login = ?`, [login]);
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o usuário!');
    }
  },


  async buscaPorLoginMatricula(login, matricula) {
    const sql = `SELECT * FROM usuarios WHERE (login = ?) or (matricula = ?)`;
    console.log(sql);
    try {
      return await dbGet(sql, [login, matricula]);
    } catch (erro) {
      throw new InternalServerError('Não foi possível encontrar o usuário!');
    }
  },

 

  async lista() {
    try {
      return await dbAll(`SELECT * FROM usuarios`);
    } catch (erro) {
      throw new InternalServerError('Erro ao listar usuários!');
    }
  },


  async atualiza(usuario) {
    try {
      await dbRun(`UPDATE usuarios SET nome = ?, matricula = ?, login = ?, senhaHash = ?, email = ?, area_fk=?, privilegio_fk = ? WHERE id = ?`, [
          usuario.nome,
          usuario.matricula,
          usuario.login,
          usuario.senhaHash,
          usuario.area,
          usuario.privilegio,
          usuario.id
      ]);
    } catch (erro) {
      throw new InternalServerError('Erro ao modificar o usuario!');
    }
  },

  async modificaEmailVerificado(usuario, emailVerificado) {
    try {
      await dbRun(`UPDATE usuarios SET emailVerificado = ? WHERE id = ?`, [
        emailVerificado,
        usuario.id
      ]);
    } catch (erro) {
      throw new InternalServerError('Erro ao modificar a verficação de e-mail!');
    }
  },

  async deleta(usuario) {
    try {
      await dbRun(`DELETE FROM usuarios WHERE id = ?`, [usuario.id]);
    } catch (erro) {
      throw new InternalServerError('Erro ao deletar o usuário');
    }
  }

};
