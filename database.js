const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite');


const DROP_USUARIO = `
  DROP TABLE IF EXISTS usuarios;
`;

const DROP_AREA = `
  DROP TABLE IF EXISTS areas;
`;



const EQUIPAMENTOS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS equipamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao VARCHAR(255) NOT NULL,
    fabricante VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    codigoCPTM VARCHAR(6) NOT NULL
    )
  `;

const AREAS_SCHEMA = `
CREATE TABLE IF NOT EXISTS areas(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sigla VARCHAR(6) NOT NULL UNIQUE,
  descricao VARCHAR(200) NOT NULL
  )
`;

const USUARIOS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(40) NOT NULL,
    matricula VARCHAR(9) NOT NULL UNIQUE,
    login VARCHAR(20) NOT NULL UNIQUE,
    senhaHash VARCHAR(255) NOT NULL,
    area_fk INTEGER,
    PRIVILEGIO VARCHAR(10),
    FOREIGN KEY(area_fk) REFERENCES areas(id)
    )
  `;



   const ASSOCIACOES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS associacoes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_fk NUMBER, 
      equipamento_fk NUMBER,
      status varchar(20),
      foreign key(usuario_fk) references usuarios(id), 
      foreign key(equipamento_fk) references equipamentos(id)
      )
    `;


  const REVISOES_SCHEMA = `
  CREATE TABLE IF NOT EXISTS revisoes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_fk NUMBER, 
    equipamento_fk NUMBER,
    status varchar(20),
    descricao_falha VARCHAR(255),
    descricao_resolucao VARCHAR(255),
    foreign key(usuario_fk) references usuarios(id), 
    foreign key(equipamento_fk) references equipamentos(id)
    )
  `;

  const CONTROLES_SCHEMA = `
  CREATE TABLE IF NOT EXISTS controles(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    area_detentora_fk NUMBER, 
    solicitante_fk NUMBER,
    equipamento_fk NUMBER,
    status varchar(20),
    foreign key(area_fk) references areas(id), 
    foreign key(solicitante_fk) references usuarios(id), 
    foreign key(equipamento_fk) references equipamentos(id)
    )
  `;


db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON');
 // db.run(DROP_USUARIO);
 // db.run(DROP_AREA);
  db.run(EQUIPAMENTOS_SCHEMA);
  db.run(USUARIOS_SCHEMA);
  db.run(AREAS_SCHEMA);
  db.run(ASSOCIACOES_SCHEMA);
  db.run(CONTROLES_SCHEMA);
  db.run(REVISOES_SCHEMA);
});

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = db;
