import { Box, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Translation } from "../../domain/translation";
import { useAppDispatch } from "../../state/store";
import { patchTranslationValueById } from "./translations.slice";

interface TranslationEditorProps {
  translation: Translation;
}

export const TranslationEditor: React.FC<TranslationEditorProps> = ({
  translation,
}) => {
  const dispatch = useAppDispatch();
  const [internalValue, setInternalValue] = useState<string>(translation.value);

  useEffect(() => {
    setInternalValue(translation.value);
  }, [translation.value]);

  return (
    <Box component="div" display="flex" flexDirection="column" mb={1}>
      <TextField
        variant="outlined"
        value={internalValue}
        label={translation.lang}
        size="small"
        onChange={(event) => setInternalValue(event.target.value)}
        onBlur={(event) => {
          let value = event.target.value;
          if (value === translation.value) {
            return;
          }

          dispatch(
            patchTranslationValueById({
              translationId: translation.id,
              value,
            })
          );
        }}
      />
    </Box>
  );
};
