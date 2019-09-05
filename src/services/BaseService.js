import apiClient from "./ApiClient.js";

let BaseService = {
  apiClient: apiClient,
  path: "",
  create: async function(data) {
    let res = await this.apiClient.post(this.path, data);
    return res.data;
  },
  readRows: async function(limit = 10, skip = 0) {
    let res = await this.apiClient.get(
      `${this.path}?limit=${limit}&skip=${skip}`
    );
    return res.data;
  },
  read: async function(id) {
    let res = await this.apiClient.get(`${this.path}/${id}`);
    return res.data;
  },
  update: async function(id, data) {
    let res = await this.apiClient.put(`${this.path}/${id}`, data);
    return res.data;
  },
  delete: async function(id) {
    let res = await this.apiClient.delete(`${this.path}/${id}`);
    return res.data;
  }
};

export default BaseService;
