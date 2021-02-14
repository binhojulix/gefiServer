const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');

const POSTS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS equipamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao VARCHAR(255) NOT NULL,
    fabricante VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    codigoCPTM VARCHAR(6) NOT NULL
  )
  `;

const USUARIOS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(40) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    matricula VARCHAR(9) NOT NULL UNIQUE,
    login VARCHAR(20) NOT NULL UNIQUE,
    senhaHash VARCHAR(255) NOT NULL,
    emailVerificado INTEGER
  )
  `;

db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON');
  db.run(POSTS_SCHEMA);
  db.run(USUARIOS_SCHEMA);
});

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = db;
