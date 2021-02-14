const equipamentoDao = require('./equipamentos-dao');
const validacoes = require('../validacoes-comuns');

class Equipamento {
  constructor(equipamento) {
    this.equipamento = equipamento.descricao;
    this.codigoCPTM = equipamento.codigoCPTM;
    this.modelo = equipamento.modelo;
    this.fabricante = equipamento.fabricante;
    this.valida();
  }

  adiciona() {
    return equipamentoDao.adiciona(this);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.descricao, 'descricao');
    validacoes.campoTamanhoMinimo(this.descricao, 'descricao', 5);

    validacoes.campoStringNaoNulo(this.conteudo, 'descricao');
    validacoes.campoTamanhoMaximo(this.conteudo, 'descricao', 140);

    validacoes.campoTamanhoMaximo(this.codigoCPTM, 'codigoCPTM', 6);
  }

  static lista() {
    return equipamentoDao.lista();
  }
}

module.exports = Equipamento;
