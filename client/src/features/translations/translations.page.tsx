import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { TranslationKeyTree } from '../../domain/translation-key-tree';

import { useAppDispatch } from '../../state/store';
import { TranslationEditor } from './translation-editor';
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

  const treeItems = React.useMemo(() => {
    const renderTree = (node: TranslationKeyTree) => (
      <TreeItem
        key={node.getKeyPath()}
        nodeId={node.getKeyPath()}
        label={node.key}
        onLabelClick={(event) => {
          event.preventDefault();
          dispatch(selectKey(node.getKeyPath()));
        }}
      >
        {Array.isArray(node.children)
          ? node.children.map((n) => renderTree(n))
          : null}
      </TreeItem>
    );

    return translationKeysTrees.map(renderTree);
  }, [translationKeysTrees, dispatch]);

  const translationKeys = useMemo(() => {
    const set = new Set(translations.map((t) => t.key));
    return Array.from(set).sort();
  }, [translations]);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          selected={selectedKey}
        >
          {treeItems}
        </TreeView>
      </Grid>
      <Grid item>
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
