class ApiService {
  constructor(apiUrl, tokenService) {
    this.apiUrl = apiUrl;
    this.tokenService = tokenService;
  }

  async sendRequest(method, path, params) {
    const url = `${this.apiUrl}/${path}`;

    console.log('sendRequest', url, this.apiUrl);

    params = this.prepareParams(method, params);

    let response = null;

    const handleError = this.getErrorHandler();

    response = await (fetch(url, params).catch(handleError));
    response = await this.checkResponse(response);

    return response;
  }

  getHeaders() {
    const headers = {}; // {'Content-Type': 'application/json'};

    console.log('this.tokenService', this.tokenService);

    if (this.tokenService) {
      const token = this.tokenService.get();

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  prepareParams(method, params) {
    const headers = this.getHeaders();

    const fetchParams = {
      method,
      headers
    };

    if (params) {
      if (params instanceof FormData) {
        fetchParams['body'] = params;
      } else {
        fetchParams['headers']['Content-Type'] = 'application/json';
        fetchParams['body'] = JSON.stringify(params);
      }
    }

    return fetchParams;
  }

  getErrorHandler() {
    return (err) => {
      return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
      }));
    }
  }

  async checkResponse(response) {
    if (response.status === 401) {
      throw new Error('EEEE', { cause: 401 });
    }

    if (response.status === 204) {
      return true;
    }

    console.log(`API`, response, response.body);

    try {
      response = await response.json();
    } catch (error) {
      response = null;
    }
    return response;
  }
}

export default ApiService;
