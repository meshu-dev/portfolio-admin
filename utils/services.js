import ApiService from '@/services/ApiService';
import AuthService from '@/services/AuthService';
import ProjectService from '@/services/ProjectService';
import PrototypeService from '@/services/PrototypeService';
import AboutService from '@/services/AboutService';
import TypeService from '@/services/TypeService';
import TechnologyService from '@/services/TechnologyService';
import RepositoryService from '@/services/RepositoryService';
import ImageService from '@/services/ImageService';

export const apiService = new ApiService();

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

export const typeService = new TypeService(
  apiService,
  'types'
);

export const technologyService = new TechnologyService(
  apiService,
  'technologies'
);

export const repositoryService = new RepositoryService(
  apiService,
  'repositories'
);

export const imageService = new ImageService(
  apiService,
  'images'
);
