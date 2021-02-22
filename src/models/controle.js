'use strict';
module.exports = (sequelize, DataTypes) => {
  const Controle = sequelize.define('Controles', {
    motivo_falha: DataTypes.STRING,
    solucao_falha: DataTypes.STRING,
    data_falha: DataTypes.DATE,
    data_solucao: DataTypes.DATE,
    disponivel: DataTypes.BOOLEAN
  }, {});
  Controle.associate = function(models) {
    // associations can be defined here
    Controle.belongsTo(models.Usuarios, {foreignKey: 'usuario_id', targetKey: 'id'});
    Controle.belongsTo(models.Areas, {foreignKey: 'area_id', targetKey: 'id'});
    Controle.belongsTo(models.Equipamentos, {foreignKey: 'equipamento_id', targetKey: 'id'});
 
   
  };
  return Controle;
};