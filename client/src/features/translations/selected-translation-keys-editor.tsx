import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import { Translation } from '../../domain/translation';
import { TranslationEditor } from './translation-editor';

interface SelectedTranslationKeysEditorProps {
  translations: Translation[];
}

export const SelectedTranslationKeysEditor: React.FC<SelectedTranslationKeysEditorProps> = ({
  translations,
}) => {
  const translationKeys = useMemo(() => {
    const set = new Set(translations.map((t) => t.key));
    return Array.from(set).sort();
  }, [translations]);

  return (
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
  );
};
