class InvalidArgumentError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'InvalidArgumentError';
  }
}

class InternalServerError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'InternalServerError';
  }
}

class NaoEncontrado extends Error {
  constructor (entidade) {
    const mensagem = `Não foi possível encontrar ${entidade}`
    super(mensagem)
    this.name = 'NaoEncontrado'
  }
}

class NaoAutorizado extends Error {
  constructor () {
    const mensagem = 'Não foi possível acessar esse recurso'
    super(mensagem)
    this.name = 'NaoAutorizado'
  }
}

class HttpException extends Error {
  constructor(status, message, data) {
      super(message);
      this.status = status;
      this.message = message;
      this.data = data;
  }
}

module.exports = { InvalidArgumentError, InternalServerError, NaoAutorizado, NaoEncontrado, HttpException };

