const Sequelize = require('sequelize');
const db = require('../infraestrutura/database');

const Equipamento = db.define('equipamento', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    codigo_cptm: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fabricante: {
        type: Sequelize.STRING,
        allowNull: false
    },
    modelo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    isAtivo: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },

});




module.exports = Equipamento;