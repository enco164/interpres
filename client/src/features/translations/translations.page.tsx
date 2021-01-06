import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { useAppDispatch } from '../../state/store';
import { TranslationEditor } from './translation-editor';
import { TranslationKeysTreeView } from './translation-keys-tree-view';
import {
  fetchTranslationsByProjectId,
  selectKey,
  selectSelectedKey,
  selectSelectedTranslations,
  selectTranslationKeysTrees,
} from './translations.slice';

export const TranslationsPage: React.FC = () => {
  const selectedKey = useSelector(selectSelectedKey);
  const translations = useSelector(selectSelectedTranslations);
  const translationKeysTrees = useSelector(selectTranslationKeysTrees);
  const dispatch = useAppDispatch();
  const { params } = useRouteMatch<{ projectId: string }>();

  useEffect(() => {
    const promise = dispatch(
      fetchTranslationsByProjectId({ projectId: +params.projectId }),
    );

    return () => {
      promise.abort();
    };
  }, [dispatch, params]);

  const translationKeys = useMemo(() => {
    const set = new Set(translations.map((t) => t.key));
    return Array.from(set).sort();
  }, [translations]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TranslationKeysTreeView
          translationKeysTrees={translationKeysTrees}
          selectedKey={selectedKey}
          onKeySelect={(key) => dispatch(selectKey(key))}
        />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="subtitle1">Edit translations</Typography>
        <List>
          {translationKeys.map((translationKey) => (
            <ListItem alignItems="flex-start" key={translationKey}>
              <ListItemText
                disableTypography
                primary={<Typography>{translationKey}</Typography>}
                secondary={
                  <Box>
                    {translations
                      .filter((t) => t.key === translationKey)
                      .map((translation) => (
                        <TranslationEditor
                          key={translation.key + translation.lang}
                          translation={translation}
                        />
                      ))}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
