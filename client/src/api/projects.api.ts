import { BaseApiClient, JSONApiResponse } from "../core/api";
import { Project } from "../domain/project";

class ProjectsApiClient extends BaseApiClient {
  async getProjects() {
    const response = await this.fetchApi("/api/translation-service/projects");
    return new JSONApiResponse<Project[]>(response).value();
  }
}

export const ProjectsApi = new ProjectsApiClient();
