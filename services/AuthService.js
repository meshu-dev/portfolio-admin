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

    if (response['token']) {
      // localStorage.setItem('token', response['token']);
      return true;
    }
    return false;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    return true;
  }
}

export default AuthService;
