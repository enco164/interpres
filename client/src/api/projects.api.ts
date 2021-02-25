import { BaseApiClient, JSONApiResponse } from '../core/api';
import { Project } from '../domain/project';
import { Translation } from '../domain/translation';
import { CreateProjectDto } from './dto/create-project.dto';

class ProjectsApiClient extends BaseApiClient {
  async getProjects() {
    const response = await this.fetchApi('/api/translation-service/projects');
    return new JSONApiResponse<Project[]>(response).value();
  }

  async getTranslationsByProjectId(projectId: number) {
    const response = await this.fetchApi(
      `/api/translation-service/projects/${projectId}/translations`,
    );
    return new JSONApiResponse<Translation[]>(response).value();
  }

  async postProject(params: CreateProjectDto, init?: RequestInit) {
    const response = await this.fetchApi('/api/projects', {
      ...init,
      method: 'POST',
      body: JSON.stringify(params),
    });
    return new JSONApiResponse(response).value();
  }
}

export const ProjectsApi = new ProjectsApiClient();
