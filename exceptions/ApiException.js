class ApiException {
  constructor(message, code) {
    this._message = message;
    this._code = code;
  }

  get message() {
    return this._message;
  }

  get code() {
    return this._code;
  }
}

export default ApiException;
