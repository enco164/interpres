import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ProjectsApi } from '../../api/projects.api';
import { Translation } from '../../domain/translation';
import { TranslationKeyTree } from '../../domain/translation-key-tree';
import { RootState } from '../../state/store';

const entityAdapter = createEntityAdapter<Translation>({
  selectId: (model) => model.id,
  sortComparer: (a, b) => a.key.localeCompare(b.key),
});

const initialState = entityAdapter.getInitialState({ selectedKey: '' });

export const fetchTranslationsByProjectId = createAsyncThunk(
  'translations/fetchTranslationsByProjectId',
  (arg: { projectId: number }) =>
    ProjectsApi.getTranslationsByProjectId(arg.projectId),
);

export const translationsSlice = createSlice({
  name: 'translations',
  initialState,
  reducers: {
    selectKey: (state, action: PayloadAction<string>) => {
      state.selectedKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTranslationsByProjectId.fulfilled, (state, action) => {
      entityAdapter.setAll(state, action);
    });
  },
});

const selectSelf = (state: RootState) => state.translations;

export const { selectAll: selectAllTranslations } = entityAdapter.getSelectors(
  selectSelf,
);

export const { selectKey } = translationsSlice.actions;

export const selectTranslationKeys = createSelector(
  selectAllTranslations,
  (translations) => translations.map((t) => t.key),
);

export const selectTranslationKeysTrees = createSelector(
  selectAllTranslations,
  (translations) => {
    const trees: TranslationKeyTree[] = [];
    translations.forEach((translation) => {
      const [rootKey, ...tail] = translation.key.split('.');
      let tree = trees.find((t) => t.key === rootKey);
      if (!tree) {
        tree = new TranslationKeyTree(rootKey, null);
        trees.push(tree);
      }
      if (tail.length > 0) {
        tree.addKeyPath(tail.join('.'));
      }
    });
    return trees; //.sort((a, b) => a.key.localeCompare(b.key));
  },
);

export const selectTranslationsByKeyStartsWith = createSelector(
  selectAllTranslations,
  (_: RootState, keyStartsWith: string) => keyStartsWith,
  (translations, keyStartsWith) =>
    translations.filter((t) => t.key.startsWith(keyStartsWith)),
);

export const selectSelectedKey = createSelector(
  selectSelf,
  (res) => res.selectedKey,
);

export const selectSelectedTranslations = createSelector(
  selectSelf,
  selectAllTranslations,
  (state, translations) =>
    translations.filter((t) => t.key.startsWith(state.selectedKey)),
);
