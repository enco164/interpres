import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { CreateProjectDto } from "../../api/dto/create-project.dto";
import { UpdateProjectDto } from "../../api/dto/update-project.dto";
import { ProjectsApi } from "../../api/projects.api";
import { Project } from "../../domain/project";
import { TestConnectionResult } from "../../domain/test-connection-result";
import { RootState } from "../../state/store";

const entityAdapter = createEntityAdapter<Project>({
  selectId: (model) => model.id,
});

const initialState = entityAdapter.getInitialState();

export const fetchProjects = createAsyncThunk("projects/fetchProjects", () =>
  ProjectsApi.getProjects()
);

export const fetchProjectById = createAsyncThunk<Project, { id: string }>(
  "projects/fetchProjectById",
  (arg, { signal }) => ProjectsApi.getProjectById(arg, { signal })
);

export const createProject = createAsyncThunk<Project, CreateProjectDto>(
  "projects/createProject",
  (arg, { signal }) => ProjectsApi.createProject(arg, { signal })
);

export const updateProject = createAsyncThunk<Project, UpdateProjectDto>(
  "projects/updateProject",
  (arg, { signal }) => ProjectsApi.updateProject(arg, { signal })
);

export const testConnection = createAsyncThunk<
  TestConnectionResult,
  CreateProjectDto
>("projects/testConnection", (arg, { signal }) =>
  ProjectsApi.testConnection(arg, { signal })
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        entityAdapter.setAll(state, action);
      })
      .addCase(createProject.fulfilled, (state, action) => {
        entityAdapter.addOne(state, action);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        entityAdapter.updateOne(state, {
          id: action.meta.arg.id,
          changes: action.payload,
        });
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        entityAdapter.upsertOne(state, action);
      });
  },
});

const selectSelf = (state: RootState) => state.projects;

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
} = entityAdapter.getSelectors(selectSelf);
