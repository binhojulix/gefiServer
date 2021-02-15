const {InvalidArgumentError} = require('./erros');

module.exports = {

  campoStringNaoNulo(valor, nome) {
    if (typeof valor !== 'string' || valor === 0)
      throw new InvalidArgumentError(`É necessário preencher o campo ${nome}!`);
  },

  campoIntegerNaoNulo(valor, nome) {
    if (typeof valor !== 'number' || valor === 0)
      throw new InvalidArgumentError(`É necessário preencher o campo ${nome}!`);
  },

  campoTamanhoMinimo(valor, nome, minimo) {
    if (valor.length < minimo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser maior que ${minimo} caracteres!`
      );
  },

  campoTamanhoMaximo(valor, nome, maximo) {
    if (valor.length > maximo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser menor que ${maximo} caracteres!`
      );
  },

  campoTamanhoPermitido(valor, nome, permitido) {
    if (valor.length != permitido)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ter o  tamanho de ${permitido} caracteres!`
      );
  }
};
