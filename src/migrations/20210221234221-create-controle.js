'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Controles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      motivo_falha: {
        type: Sequelize.STRING
      },
      solucao_falha: {
        type: Sequelize.STRING
      },
      data_falha: {
        type: Sequelize.DATE
      },
      data_solucao: {
        type: Sequelize.DATE
      },

      disponivel:{
        type:Sequelize.BOOLEAN
      },

      equipamento_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
           model: 'Equipamentos', 
           key: 'id'
        }
      },

      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
           model: 'Usuarios', 
           key: 'id'
        }
      },

      area_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
           model: 'Areas', 
           key: 'id'
        }
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
    return queryInterface.dropTable('Controles');
  }
};