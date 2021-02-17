class HttpException extends Error {
    constructor(status, message, data) {
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

class InvalidArgumentError extends Error {
    constructor(mensagem, status) {
      super(mensagem);
      this.name = 'InvalidArgumentError';
    }
  }
  
  class InternalServerError extends Error {
    constructor(mensagem, statu ) {
      super(mensagem);
      this.name = 'InternalServerError';
    }
  }


module.exports = {HttpException, InvalidArgumentError, InternalServerError};