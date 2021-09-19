import {
  Box,
  Grid,
  List,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useProjectIdParam } from "../../hooks/use-project-id-param";

import { RootState, useAppDispatch } from "../../state/store";
import {
  fetchProjectById,
  selectProjectById,
} from "../projects/projects.slice";
import { SelectedTranslationKeysEditor } from "./selected-translation-keys-editor";
import { TranslationKeysTreeView } from "./translation-keys-tree-view";
import {
  fetchTranslationsByProjectId,
  selectKeyAndNamespace,
  selectSelectedTranslations,
  selectTranslationKeyTreesByNamespace,
  selectTranslationsSlice,
} from "./translations.slice";

const useStyles = makeStyles(() => ({
  namespace: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  selectedNamespace: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

export const TranslationsPage: React.FC = () => {
  const { t } = useTranslation(["project-translations"]);
  const dispatch = useAppDispatch();
  const projectId = useProjectIdParam();
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  const { selectedKey, selectedNamespace } = useSelector(
    selectTranslationsSlice
  );
  const translations = useSelector(selectSelectedTranslations);
  const translationKeyTreesByNamespace = useSelector(
    selectTranslationKeyTreesByNamespace
  );

  useEffect(() => {
    const promise = dispatch(fetchTranslationsByProjectId({ projectId }));

    return () => {
      promise.abort();
    };
  }, [dispatch, projectId]);

  useEffect(() => {
    const promise = dispatch(fetchProjectById({ id: projectId }));

    return () => {
      promise.abort();
    };
  }, [dispatch, projectId]);

  const translationKeys = useMemo(() => {
    const set = new Set(translations.map((t) => t.key));
    return Array.from(set).sort();
  }, [translations]);

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography variant="h6" gutterBottom color="primary">
          {t("translation_keys_header")}
        </Typography>
        {Object.keys(translationKeyTreesByNamespace).map((namespace) => {
          const namespaceClasses = [
            classes.namespace,
            namespace === selectedNamespace && classes.selectedNamespace,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <Box key={namespace}>
              <ListSubheader
                component="div"
                disableGutters
                className={namespaceClasses}
                onClick={() =>
                  dispatch(selectKeyAndNamespace({ key: "", namespace }))
                }
              >
                {namespace}
              </ListSubheader>
              <TranslationKeysTreeView
                translationKeysTrees={translationKeyTreesByNamespace[namespace]}
                selectedKey={selectedKey}
                selectedNamespace={selectedNamespace}
                onKeySelect={(k) =>
                  dispatch(selectKeyAndNamespace({ key: k, namespace }))
                }
              />
            </Box>
          );
        })}
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h6" gutterBottom color="primary">
          {t("edit_translations_header")}
        </Typography>
        <List>
          {translationKeys.map((translationKey) => {
            const selectedTranslations = project?.languages.map(
              (lang) =>
                translations.find(
                  (t) => t.key === translationKey && t.lang === lang
                ) ?? {
                  id: null,
                  lang,
                  key: translationKey,
                  value: "",
                  namespace: selectedNamespace,
                }
            );
            if (!selectedTranslations) {
              return null;
            }
            return (
              <SelectedTranslationKeysEditor
                translations={selectedTranslations}
                translationKey={translationKey}
                projectId={projectId}
              />
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};
