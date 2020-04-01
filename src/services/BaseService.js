import apiClient from "./ApiClient.js";

let BaseService = {
  apiClient: apiClient,
  path: "",
  create: async function(data) {
    return await this.apiClient.post(this.path, data);
  },
  readRows: async function(limit = 10, skip = 0) {
    let response = await this.apiClient.get(
      `${this.path}?limit=${limit}&skip=${skip}`
    );
    return response;
  },
  read: async function(id) {
    return await this.apiClient.get(`${this.path}/${id}`);
  },
  update: async function(id, data) {
    return await this.apiClient.put(`${this.path}/${id}`, data);
  },
  delete: async function(id) {
    return await this.apiClient.delete(`${this.path}/${id}`);
  }
};

export default BaseService;
