import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import * as jsonpatch from "fast-json-patch";
import { TranslationsApi } from "../../api/translations.api";
import { CreateTranslationDto } from "../../domain/create-translation.dto";
import { Translation } from "../../domain/translation";
import { TranslationKeyTree } from "../../domain/translation-key-tree";
import { RootState } from "../../state/store";

const entityAdapter = createEntityAdapter<Translation>({
  selectId: (model) => model.id,
  sortComparer: (a, b) => a.key.localeCompare(b.key),
});

const initialState = entityAdapter.getInitialState({
  selectedKey: "",
  selectedNamespace: "",
});

export const fetchTranslationsByProjectId = createAsyncThunk(
  "translations/fetchTranslationsByProjectId",
  (arg: { projectId: string }) => TranslationsApi.getByProjectId(arg.projectId)
);

const deepCopy = <T>(arg: T): T => JSON.parse(JSON.stringify(arg));

export const patchTranslationValueById = createAsyncThunk<
  Translation,
  { translationId: number; value: string },
  { state: RootState }
>("translations/patchTranslationValueById", async (arg, thunkAPI) => {
  let entity = thunkAPI.getState().translations.entities[arg.translationId];
  if (!entity) {
    throw new Error(`Translation with id ${arg.translationId} not found`);
  }

  const applied = { ...entity, value: arg.value };
  const patches = jsonpatch.compare(deepCopy(entity), applied);

  return TranslationsApi.patchTranslation(
    { translationId: arg.translationId, patches },
    thunkAPI.signal
  );
});

export const createTranslation = createAsyncThunk<
  Translation,
  CreateTranslationDto,
  { state: RootState }
>("translations/createTranslation", (arg, thunkAPI) =>
  TranslationsApi.createTranslation(arg, thunkAPI.signal)
);

export const translationsSlice = createSlice({
  name: "translations",
  initialState,
  reducers: {
    selectKeyAndNamespace: (
      state,
      action: PayloadAction<{ key: string; namespace: string }>
    ) => {
      state.selectedKey = action.payload.key;
      state.selectedNamespace = action.payload.namespace;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslationsByProjectId.fulfilled, (state, action) => {
        entityAdapter.setAll(state, action);
      })
      .addCase(patchTranslationValueById.fulfilled, (state, action) => {
        entityAdapter.updateOne(state, {
          id: action.meta.arg.translationId,
          changes: action.payload,
        });
      })
      .addCase(createTranslation.fulfilled, (state, action) => {
        entityAdapter.addOne(state, action);
      });
  },
});

export const selectTranslationsSlice = (state: RootState) => state.translations;

export const { selectAll: selectAllTranslations } = entityAdapter.getSelectors(
  selectTranslationsSlice
);

export const { selectKeyAndNamespace } = translationsSlice.actions;

export const selectTranslationKeys = createSelector(
  selectAllTranslations,
  (translations) => translations.map((t) => t.key)
);

export const selectTranslationsByNamespace = createSelector(
  selectAllTranslations,
  (translations) =>
    translations.reduce((previousValue, currentValue) => {
      if (!previousValue[currentValue.namespace]) {
        previousValue[currentValue.namespace] = [];
      }
      previousValue[currentValue.namespace].push(currentValue);
      return previousValue;
    }, {} as Record<string, Translation[]>)
);

export const selectTranslationKeyTreesByNamespace = createSelector(
  selectTranslationsByNamespace,
  (translationsByNamespace) => {
    const result = {} as Record<string, TranslationKeyTree[]>;
    Object.keys(translationsByNamespace).forEach((namespace) => {
      const trees: TranslationKeyTree[] = [];
      const translations = translationsByNamespace[namespace];
      translations.forEach((translation) => {
        const [rootKey, ...tail] = translation.key.split(".");
        let tree = trees.find((t) => t.key === rootKey);
        if (!tree) {
          tree = new TranslationKeyTree(rootKey, namespace, null);
          trees.push(tree);
        }
        if (tail.length > 0) {
          tree.addKeyPath(tail.join("."), namespace);
        }
      });
      result[namespace] = trees;
    });
    return result;
  }
);

export const selectSelectedTranslations = createSelector(
  selectTranslationsSlice,
  selectAllTranslations,
  (state, translations) =>
    translations.filter((t) => {
      if (t.namespace !== state.selectedNamespace) {
        return false;
      }

      if (!state.selectedKey) {
        return true;
      }

      const selectedKeyParts = state.selectedKey.split(".");
      const translationKeyParts = t.key.split(".");

      for (let i = 0; i < selectedKeyParts.length; i++) {
        if (selectedKeyParts[i] !== translationKeyParts[i]) {
          return false;
        }
      }

      return true;
    })
);
