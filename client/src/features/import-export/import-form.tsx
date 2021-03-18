import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

interface ImportFormProps {
  onSubmit: (values: { lang: string; file: File | null }) => void;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const ImportForm: React.FC<ImportFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation(["project-import-export"]);
  const classes = useStyles();
  const initialValues: { lang: string; file: File | null } = {
    lang: "en",
    file: null,
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <Box>
            <FormControl className={classes.formControl}>
              <InputLabel>{t("import_form.language_input_label")}</InputLabel>
              <Select
                id="lang"
                name="lang"
                value={formik.values.lang}
                onChange={formik.handleChange}
              >
                <MenuItem value={"en"}>en</MenuItem>
                <MenuItem value={"sr"}>sr</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("file", event?.currentTarget?.files?.[0]);
              }}
            />
          </Box>
          <Box>
            <Button variant="contained" color="primary" type="submit">
              {t("import_form.submit_button_label")}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
