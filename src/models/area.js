'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Areas', {
    descricao: DataTypes.STRING,
    sigla: DataTypes.STRING
  }, {});
  Area.associate = function(models) {
    // associations can be defined here

  Area.hasMany(models.Usuarios, {foreignKey: 'area_id', sourceKey: 'id'});
  Area.hasMany(models.Solicitacoes, {foreignKey: 'area_id', sourceKey: 'id'});
  Area.hasMany(models.Controles, {foreignKey: 'area_id', sourceKey: 'id'});

   
  };
  return Area;
};