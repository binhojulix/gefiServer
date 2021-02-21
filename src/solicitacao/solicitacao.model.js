const Sequelize = require('sequelize');
const db = require('../infraestrutura/database');


const Solicitacao = db.define('solicitacao', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_solicitacao: {
        type: Sequelize.DATE,
        allowNull:false
    },
    data_devolucao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isAtivo: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      }

});




module.exports = Solicitacao;