'use strict';


module.exports = (sequelize, DataTypes) => {
  const Equipamento = sequelize.define('Equipamentos', {
    descricao: DataTypes.STRING,
    codigo_cptm: DataTypes.STRING,
    fabricante: DataTypes.STRING,
    modelo: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN
  }, {});
  Equipamento.associate = function(models) {
    // associations can be defined here

    Equipamento.hasMany(models.Solicitacoes, {foreignKey: 'equipamento_id', sourceKey: 'id'});
    Equipamento.hasMany(models.Controles, {foreignKey: 'equipamento_id', sourceKey: 'id'});
   
  };
  return Equipamento;
};