class TokenService {
  get() {
    return localStorage.getItem('token');
  }
}

export default TokenService;
