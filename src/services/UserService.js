import apiClient from "./ApiClient.js";

let UserService = {
  apiClient: apiClient,
  path: "/users",
  login: async function(username, password) {
    let data = {
      username: username,
      password: password
    };

    let response = {data: {}};

		try {
			response = await this.apiClient.post(
				`${this.path}/login`,
				data
			);
		} catch (error) {
			let errorMsg = 'Error: Please try again later';

			if (error.response === undefined) {
				error = JSON.parse(JSON.stringify(error));
				errorMsg = `Error: ${error.message}`;
			} else if (error.response.data.message) {
				errorMsg = error.response.data.message;
			}
			response.data['message'] = errorMsg;
		}
    return response;
  }
};

export default UserService;
