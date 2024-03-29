class BaseService {
  constructor(apiService, urlPath) {
    this.apiService = apiService;
    this.urlPath = urlPath;
  }

  async add(params) {
    return await this.apiService.sendRequest(
      'POST',
      this.urlPath,
      params
    );
  }

  async getAll(params) {
    let urlParams = '';

    if (params['limit']) {
      urlParams += `limit=${params['limit']}`;
    }

    return await this.apiService.sendRequest(
      'GET',
      `${this.urlPath}?${urlParams}`
    );
  }

  async getPaginated(page = 1) {
    return await this.apiService.sendRequest(
      'GET',
      `${this.urlPath}?page=${page}`
    );
  }

  async get(id) {
    return await this.apiService.sendRequest(
      'GET',
      `${this.urlPath}/${id}`
    );
  }

  async edit(id, params) {
    return await this.apiService.sendRequest(
      'PUT',
      `${this.urlPath}/${id}`,
      params
    );
  }

  async delete(id) {
    return await this.apiService.sendRequest(
      'DELETE',
      `${this.urlPath}/${id}`
    );
  }
}

export default BaseService;
