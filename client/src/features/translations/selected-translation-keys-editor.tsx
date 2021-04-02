import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useMemo } from "react";
import { Translation } from "../../domain/translation";
import { TranslationEditor } from "./translation-editor";

interface SelectedTranslationKeysEditorProps {
  translations: Translation[];
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(1),
  },
  listItem: {
    alignItems: "flex-start",
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
        <Paper
          className={classes.paper}
          variant="outlined"
          key={translationKey}
        >
          <ListItem className={classes.listItem}>
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
        </Paper>
      ))}
    </List>
  );
};
