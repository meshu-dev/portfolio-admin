class ValidationException {
  constructor(messages, code) {
    this._messages = messages;
    this._code = code;
  }

  get messages() {
    return this._messages;
  }

  get code() {
    return this._code;
  }
}

export default ValidationException;
