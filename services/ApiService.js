import ApiException from './../exceptions/ApiException';
import ValidationException from './../exceptions/ValidationException';

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
    let responseData = null;

    try {
      responseData = await response.json();
    } catch (error) {
      responseData = null;
    }

    if (response.status == 401) {
      throw new ApiException(
        getUnauthenticatedMessage(responseData),
        401
      );
    }

    if (response.status == 422) {
      throw new ValidationException(
        getValidationMessages(responseData),
        422
      );
    }

    if (response.status === 204) {
      return true;
    }

    return responseData;
  }
}

const getUnauthenticatedMessage = (response) => {
  let errorMessage = 'You are logged out of the API. Please re-login.';

  if (response['error']) {
    errorMessage = response['error'];
  }

  return errorMessage;
}

const getValidationMessages = async (response) => {
  const msgs = response.errors;
  let invalidMsgs = [];

  for (const typeKey in msgs) {
    const typeMsgs = msgs[typeKey];

    for (const msgKey in typeMsgs) {
      const msg = typeMsgs[msgKey];
      invalidMsgs.push(msg);
    }
  }

  return invalidMsgs;
}

export default ApiService;
