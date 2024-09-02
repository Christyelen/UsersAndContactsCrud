class APIError extends Error {
  #name;
  #httpStatusCode;
  #message;
  #error;

  constructor(httpStatusCode, message, error = null) {
    super(message);

    this.#name = this.constructor.name;
    this.#httpStatusCode = httpStatusCode;
    this.#message = message;
    this.#error = error;
  }

  get HttpStatusCode() {
    return this.#httpStatusCode;
  }

  get JSON() {
    return {
      name: this.#name,
      httpStatusCode: this.#httpStatusCode,
      errorMessage: this.#message,
      error: this.#error,
    };
  }
}

module.exports = {
  APIError,
};
