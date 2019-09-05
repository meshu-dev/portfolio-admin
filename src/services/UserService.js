import apiClient from "./ApiClient.js";

let UserService = {
  apiClient: apiClient,
  path: "/users",
  login: async function(username, password) {
    let data = {
      username: username,
      password: password
    };

    let res = await this.apiClient.post(`${this.path}/login`, data);
    return res.data;
  }
};

export default UserService;
