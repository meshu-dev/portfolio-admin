import baseService from "./BaseService.js";

let profileService = Object.assign({}, baseService);
profileService.path = "/profiles";

profileService.readByName = async function(name) {
  let res = await this.apiClient.get(`${this.path}?name=${name}`);
  let profiles = res.data;

  if (profiles !== undefined && profiles[0] !== undefined) {
    return profiles[0];
  }
  return null;
};

export default profileService;
