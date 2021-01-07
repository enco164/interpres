import { Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { useAppDispatch } from '../../state/store';
import { SelectedTranslationKeysEditor } from './selected-translation-keys-editor';
import { TranslationKeysTreeView } from './translation-keys-tree-view';
import {
  fetchTranslationsByProjectId,
  selectKey,
  selectSelectedKey,
  selectSelectedTranslations,
  selectTranslationKeysTrees,
} from './translations.slice';

export const TranslationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { params } = useRouteMatch<{ projectId: string }>();

  const selectedKey = useSelector(selectSelectedKey);
  const translations = useSelector(selectSelectedTranslations);
  const translationKeysTrees = useSelector(selectTranslationKeysTrees);

  useEffect(() => {
    const promise = dispatch(
      fetchTranslationsByProjectId({ projectId: +params.projectId }),
    );

    return () => {
      promise.abort();
    };
  }, [dispatch, params]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Typography variant="h6" gutterBottom color="primary">
          Translation keys
        </Typography>
        <TranslationKeysTreeView
          translationKeysTrees={translationKeysTrees}
          selectedKey={selectedKey}
          onKeySelect={(key) => dispatch(selectKey(key))}
        />
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
