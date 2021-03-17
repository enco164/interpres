import { BaseApiClient, JSONApiResponse } from "../core/api";
import { Project } from "../domain/project";
import { Translation } from "../domain/translation";
import { CreateProjectDto } from "./dto/create-project.dto";

const BASE_URL = "/api/translation-service/projects";

class ProjectsApiClient extends BaseApiClient {
  async getProjects() {
    const response = await this.fetchApi(BASE_URL);
    return new JSONApiResponse<Project[]>(response).value();
  }

  async getTranslationsByProjectId(projectId: number) {
    const response = await this.fetchApi(
      `${BASE_URL}/${projectId}/translations`
    );
    return new JSONApiResponse<Translation[]>(response).value();
  }

  async postProject(params: CreateProjectDto, init?: RequestInit) {
    const response = await this.fetchApi(BASE_URL, {
      ...init,
      method: "POST",
      body: JSON.stringify(params),
    });
    return new JSONApiResponse<Project>(response).value();
  }
}

export const ProjectsApi = new ProjectsApiClient();
