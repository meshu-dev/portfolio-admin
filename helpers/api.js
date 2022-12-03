import TokenService from '@/services/TokenService';
import ApiService from '@/services/ApiService';
import AuthService from '@/services/AuthService';
import ProjectService from '@/services/ProjectService';
import PrototypeService from '@/services/PrototypeService';
import AboutService from '@/services/AboutService';

//console.log('TTT', this.$config);
//console.log('TTT', process.env.API_URL);

const apiUrl = process.env.API_URL;

const config = 'AAA';//useRuntimeConfig();

console.log('T2', process.env.API_URL, getApiUrl());

const apiService = new ApiService(
  apiUrl,
  new TokenService()
);

export const authService = new AuthService(
  apiService,
  'auth/login'
);

export const projectService = new ProjectService(
  apiService,
  'projects'
);

export const prototypeService = new PrototypeService(
  apiService,
  'prototypes'
);

export const aboutService = new AboutService(
  apiService,
  'about'
);
