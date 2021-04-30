import { BaseApiClient, JSONApiResponse } from "../core/api";
import { Project } from "../domain/project";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

const BASE_URL = "/api/projects";

class ProjectsApiClient extends BaseApiClient {
  async getProjects() {
    const response = await this.fetchApi(BASE_URL);
    return new JSONApiResponse<Project[]>(response).value();
  }

  async getProjectById(arg: { id: string }, init?: RequestInit) {
    const response = await this.fetchApi(`${BASE_URL}/${arg.id}`, { ...init });
    return new JSONApiResponse<Project>(response).value();
  }

  async createProject(arg: CreateProjectDto, init?: RequestInit) {
    const response = await this.fetchApi(BASE_URL, {
      ...init,
      method: "POST",
      body: JSON.stringify(arg),
    });
    return new JSONApiResponse<Project>(response).value();
  }

  async updateProject(arg: UpdateProjectDto, init?: RequestInit) {
    const response = await this.fetchApi(`${BASE_URL}/${arg.id}`, {
      ...init,
      method: "PUT",
      body: JSON.stringify(arg),
    });
    return new JSONApiResponse<Project>(response).value();
  }
}

export const ProjectsApi = new ProjectsApiClient();
