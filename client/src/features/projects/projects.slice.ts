import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { ProjectsApi } from '../../api/projects.api';
import { Project } from '../../domain/project';
import { RootState } from '../../state/store';

const entityAdapter = createEntityAdapter<Project>({
  selectId: (model) => model.id,
});

const initialState = entityAdapter.getInitialState();

export const fetchProjects = createAsyncThunk('projects/fetchProjects', () =>
  ProjectsApi.getProjects(),
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      entityAdapter.setAll(state, action);
    });
  },
});

const selectSelf = (state: RootState) => state.projects;

export const { selectAll: selectAllProjects } = entityAdapter.getSelectors(
  selectSelf,
);
