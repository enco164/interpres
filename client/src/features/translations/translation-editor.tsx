import { Box, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../state/store";
import {
  createTranslation,
  patchTranslationValueById,
} from "./translations.slice";

interface TranslationEditorProps {
  translation: {
    id: number | null;
    lang: string;
    namespace: string;
    key: string;
    value: string;
  };
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

          if (translation.id) {
            dispatch(
              patchTranslationValueById({
                translationId: translation.id,
                value,
              })
            );
          } else {
            const { id, ...createDto } = { ...translation, value };
            dispatch(createTranslation(createDto));
          }
        }}
      />
    </Box>
  );
};
