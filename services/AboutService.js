import BaseService from './BaseService';

class AboutService extends BaseService {
  async getRow() {
    return await this.apiService.sendRequest(
      'GET',
      this.urlPath
    );
  }
}
  
export default AboutService;  
