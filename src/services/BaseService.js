import apiClient from "./ApiClient.js";

let BaseService = {
  apiClient: apiClient,
  path: "",
  create: async function(data, config = {}) {
    return await this.apiClient.post(this.path, data, config);
  },
  readRows: async function(limit = 10, skip = 0, config = {}) {
    let response = await this.apiClient.get(
      `${this.path}?limit=${limit}&skip=${skip}`,
      config
    );
    return response;
  },
  read: async function(id, config = {}) {
    return await this.apiClient.get(`${this.path}/${id}`, config);
  },
  update: async function(id, data, config = {}) {
    return await this.apiClient.put(`${this.path}/${id}`, data, config);
  },
  delete: async function(id, config = {}) {
    return await this.apiClient.delete(`${this.path}/${id}`, config);
  }
};

export default BaseService;
