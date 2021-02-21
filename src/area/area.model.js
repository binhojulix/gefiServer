const Sequelize = require('sequelize');
const db = require('../infraestrutura/database');
const Usuario = require('../usuario/usuario.model');

const Area = db.define('area', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sigla: {
        type: Sequelize.STRING,
        allowNull: false
    }
});




module.exports = Area;