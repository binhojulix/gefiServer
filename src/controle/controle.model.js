const Sequelize = require('sequelize');
const db = require('../infraestrutura/database');


const Controle = db.define('controle', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_falha: {
        type: Sequelize.DATE,
        allowNull: true
    },
    data_validacao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    motivo_falha: {
        type: Sequelize.STRING,
        allowNull: true
    },
    resolucao_da_falha: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isAtivo: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      }

});

module.exports = Controle;