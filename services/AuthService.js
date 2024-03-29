class AuthService {
  constructor(apiService, urlPath) {
    this.apiService = apiService;
    this.urlPath = urlPath;
  }

  async login(email, password) {
    const response = await this.apiService.sendRequest(
      'POST',
      this.urlPath,
      { email, password }
    );
    return response['token'] ? true : false;
  }
}

export default AuthService;
