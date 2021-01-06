import { Box, TextField } from '@material-ui/core';
import React from 'react';
import { Translation } from '../../domain/translation';

interface TranslationEditorProps {
  translation: Translation;
}

export const TranslationEditor: React.FC<TranslationEditorProps> = ({
  translation,
}) => {
  if (!translation) {
    return null;
  }
  return (
    <Box component="div" display="flex" flexDirection="column" mb={1}>
      <TextField
        variant="outlined"
        value={translation.value}
        label={translation.lang}
        size="small"
      />
    </Box>
  );
};
