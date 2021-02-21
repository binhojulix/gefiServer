const Sequelize = require('sequelize');
const db = require('../infraestrutura/database');
const Area = require('../area/area.model')

const Usuario = db.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },

    isAtivo: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },

});


Usuario.associate = function(models) {
    Usuario.belongsTo(Area, {
      foreignKey: 'area_fk'
    })
  };



module.exports = Usuario;