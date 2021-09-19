import {
  Box,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Translation } from "../../domain/translation";
import { TranslationEditor } from "./translation-editor";

interface SelectedTranslationKeysEditorProps {
  translations: (
    | Translation
    | {
        id: null;
        lang: string;
        namespace: string;
        key: string;
        value: string;
      }
  )[];
  translationKey: string;
  projectId: string;
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
  translationKey,
  projectId,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} variant="outlined" key={translationKey}>
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
                .sort((a, b) => a.lang.localeCompare(b.lang))
                .map((translation) => (
                  <TranslationEditor
                    key={translation.key + translation.lang}
                    translation={translation}
                    projectId={projectId}
                  />
                ))}
            </Box>
          }
        />
      </ListItem>
    </Paper>
  );
};
