'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Equipamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        type: Sequelize.STRING
      },
      codigo_cptm: {
        type: Sequelize.STRING
      },
      fabricante: {
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },
      ativo: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Equipamentos');
  }
};