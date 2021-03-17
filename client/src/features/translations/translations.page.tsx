import {
  Box,
  Grid,
  ListSubheader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { useAppDispatch } from '../../state/store';
import { SelectedTranslationKeysEditor } from './selected-translation-keys-editor';
import { TranslationKeysTreeView } from './translation-keys-tree-view';
import {
  fetchTranslationsByProjectId,
  selectKeyAndNamespace,
  selectSelectedTranslations,
  selectTranslationKeyTreesByNamespace,
  selectTranslationsSlice,
} from './translations.slice';

const useStyles = makeStyles(() => ({
  namespace: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  selectedNamespace: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

export const TranslationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { params } = useRouteMatch<{ projectId: string }>();

  const { selectedKey, selectedNamespace } = useSelector(
    selectTranslationsSlice,
  );
  const translations = useSelector(selectSelectedTranslations);
  const translationKeyTreesByNamespace = useSelector(
    selectTranslationKeyTreesByNamespace,
  );

  useEffect(() => {
    const promise = dispatch(
      fetchTranslationsByProjectId({ projectId: +params.projectId }),
    );

    return () => {
      promise.abort();
    };
  }, [dispatch, params]);

  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography variant="h6" gutterBottom color="primary">
          Translation keys
        </Typography>
        {Object.keys(translationKeyTreesByNamespace).map((namespace) => {
          const namespaceClasses = [
            classes.namespace,
            namespace === selectedNamespace && classes.selectedNamespace,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <Box key={namespace}>
              <ListSubheader
                component="div"
                disableGutters
                className={namespaceClasses}
                onClick={() =>
                  dispatch(selectKeyAndNamespace({ key: '', namespace }))
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
          Edit translations
        </Typography>
        <SelectedTranslationKeysEditor translations={translations} />
      </Grid>
    </Grid>
  );
};
