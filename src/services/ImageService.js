import baseService from "./BaseService.js";

let imageService = Object.assign({}, baseService);
imageService.path = "/images";

imageService.update = undefined;

export default imageService;
