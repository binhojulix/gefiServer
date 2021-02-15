const areaDao = require('./areas-dao');
const validacoes = require('../validacoes-comuns');

class Area {
  constructor(area) {
    this.sigla = area.sigla;
    this.descricao = area.descricao;
    this.valida();
  }

  adiciona() {
    return areaDao.adiciona(this);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.descricao, 'sigla');
    validacoes.campoTamanhoMinimo(this.descricao, 'sigla', 5);

    validacoes.campoStringNaoNulo(this.descricao, 'descricao');
    validacoes.campoTamanhoMaximo(this.descricao, 'descricao', 140);

  }

  static lista() {
    return areaDao.lista();
  }
}

module.exports = Area;
