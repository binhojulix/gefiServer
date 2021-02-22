'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuarios', {
    nome: DataTypes.STRING,
    matricula: DataTypes.STRING,
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    role: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN
  }, {});
  Usuario.associate = function(models) {
    // associations can be defined here
   
    Usuario.belongsTo(models.Areas, {foreignKey: 'area_id', targetKey: 'id'});
    Usuario.hasMany(models.Solicitacoes, {foreignKey: 'usuario_id', sourceKey: 'id'});
    Usuario.hasMany(models.Controles, {foreignKey: 'usuario_id', sourceKey: 'id'});
  };
  return Usuario;
};