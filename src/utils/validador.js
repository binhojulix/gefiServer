const {InvalidArgumentError} = require('./erros');

module.exports = {

  campoStringNaoNulo(valor, nome) {
    if (typeof valor !== 'string' || valor === 0)
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
        `O campo ${nome} precisa ser igual que ${maximo} caracteres!`
      );
  },

  //implementar
  campoApenasNumero(valor, nome, permitido) {
    if (valor.length != permitido)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser igual que ${maximo} caracteres!`
      );
  },

  //implementar
  campoApenasTexto(valor, nome, permitido) {
    if (valor.length != permitido)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser igual que ${maximo} caracteres!`
      );
  },

  valoresPermitidos(valor, nome, permitidos) {
    const contain = false;
    permitido.forEach(permitido => {
        if(permitido===valor){
          contain = true;
        }
    });
    if (contain)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser igual que ${maximo} caracteres!`
      );
  }


};
