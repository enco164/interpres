import { Box, TextField, Typography } from '@material-ui/core';
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
    <Box component="div" display="flex">
      <Typography>{translation.lang}</Typography>
      <TextField value={translation.value} />
    </Box>
  );
};
