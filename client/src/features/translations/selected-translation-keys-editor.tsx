import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useMemo } from "react";
import { Translation } from "../../domain/translation";
import { TranslationEditor } from "./translation-editor";

interface SelectedTranslationKeysEditorProps {
  translations: Translation[];
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: "flex-start",
    "&:last-child": {
      borderBottom: "none",
    },
  },
}));

export const SelectedTranslationKeysEditor: React.FC<SelectedTranslationKeysEditorProps> = ({
  translations,
}) => {
  const translationKeys = useMemo(() => {
    const set = new Set(translations.map((t) => t.key));
    return Array.from(set).sort();
  }, [translations]);

  const classes = useStyles();

  return (
    <List>
      {translationKeys.map((translationKey) => (
        <ListItem key={translationKey} className={classes.listItem}>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="subtitle2" gutterBottom>
                {translationKey}
              </Typography>
            }
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
