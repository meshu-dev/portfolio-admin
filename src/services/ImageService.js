import baseService from "./BaseService.js";

let imageService = Object.assign({}, baseService);
imageService.path = "/images";

imageService.update = undefined;

imageService.delete = async function(keys, config = {}) {
	config.data = keys;
	return await this.apiClient.delete(`${this.path}`, config);
};

export default imageService;
