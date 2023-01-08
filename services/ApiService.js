class ApiService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  set baseUrl(value) {
    this.apiUrl = value;
  }

  async sendRequest(method, path, params) {
    const url = `${this.apiUrl}/${path}`;

    params = this.prepareParams(method, params);

    console.log('sendRequest', url, this.apiUrl, params);

    let response = null;

    const handleError = this.getErrorHandler();

    response = await (fetch(url, params).catch(handleError));
    response = await this.checkResponse(response);

    return response;
  }

  prepareParams(method, params) {
    const fetchParams = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json'
      },
      credentials: 'include'
    };

    if (params) {
      if (params instanceof FormData) {
        fetchParams['body'] = params;
        fetchParams['headers'] = [];
      } else {
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
      throw new Error('You are logged out of the API. Please re-login.', { cause: 401 });
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
