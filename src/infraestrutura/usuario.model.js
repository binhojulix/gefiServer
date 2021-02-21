const Sequelize = require('sequelize');
const database = require('./database');

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    matricula: {
      type: Sequelize.STRING,
      allowNull: true
    },

    login: {
      type: Sequelize.STRING,
      allowNull: true
    },
    
    senha: {
      type: Sequelize.STRING,
      allowNull: true
    },

   
})
 
module.exports = Usuario;