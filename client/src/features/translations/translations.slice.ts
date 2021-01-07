import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import * as jsonpatch from 'fast-json-patch';
import { ProjectsApi } from '../../api/projects.api';
import { TranslationsApi } from '../../api/translations.api';
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

const deepCopy = <T>(arg: T): T => JSON.parse(JSON.stringify(arg));

export const patchTranslationValueById = createAsyncThunk<
  void,
  { translationId: number; value: string },
  { state: RootState }
>('translations/patchTranslationValueById', async (arg, thunkAPI) => {
  let entity = thunkAPI.getState().translations.entities[arg.translationId];
  if (!entity) {
    throw new Error(`Translation with id ${arg.translationId} not found`);
  }
  let applied = { ...entity, value: arg.value };
  let patches = jsonpatch.compare(deepCopy(entity), applied);
  return TranslationsApi.patchTranslation(
    { translationId: arg.translationId, patches },
    thunkAPI.signal,
  );
});

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
    return trees;
  },
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
