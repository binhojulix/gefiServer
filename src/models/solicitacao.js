'use strict';
module.exports = (sequelize, DataTypes) => {
  const Solicitacao = sequelize.define('Solicitacoes', {
    data_solicitacao: DataTypes.DATE,
    data_devolucao: DataTypes.DATE,
    disponivel: DataTypes.BOOLEAN
  }, {});
  Solicitacao.associate = function(models) {
    // associations can be defined here
    Solicitacao.belongsTo(models.Equipamentos, {foreignKey: 'equipamento_id', targetKey: 'id'});
    Solicitacao.belongsTo(models.Usuarios, {foreignKey: 'usuario_id', targetKey: 'id'});
    Solicitacao.belongsTo(models.Areas, {foreignKey: 'area_id', targetKey: 'id'});

  };
  
  return Solicitacao;
};