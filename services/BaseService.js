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

  async getAll() {
    return await this.apiService.sendRequest(
      'GET',
      this.urlPath
    );
  }

  async get(id) {
    return await this.apiService.sendRequest(
      'GET',
      this.urlPath
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
