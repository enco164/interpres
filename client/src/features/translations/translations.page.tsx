import { Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { TranslationKeyTree } from '../../domain/translation-key-tree';

import { useAppDispatch } from '../../state/store';
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

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          // onNodeSelect={(event) => {
          //   event.preventDefault();
          // }}
          selected={selectedKey}
        >
          {treeItems}
        </TreeView>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Edit translations</Typography>
        <pre>{JSON.stringify(translations, null, 2)}</pre>
      </Grid>
    </Grid>
  );
};
