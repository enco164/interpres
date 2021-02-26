import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { ImportTranslationsDto } from '../../api/dto/import-translations.dto';

interface ImportFormProps {
  onSubmit: (values: ImportTranslationsDto) => void;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const ImportForm: React.FC<ImportFormProps> = ({ onSubmit }) => {
  const classes = useStyles();
  return (
    <Formik initialValues={{ lang: 'en', file: null }} onSubmit={onSubmit}>
      {(formik) => (
        <Form>
          <Box>
            <FormControl className={classes.formControl}>
              <InputLabel>Language</InputLabel>
              <Select
                id="lang"
                name="lang"
                value={formik.values.lang}
                onChange={formik.handleChange}
              >
                <MenuItem value={'en'}>en</MenuItem>
                <MenuItem value={'sr'}>sr</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                formik.setFieldValue('file', event?.currentTarget?.files?.[0]);
              }}
            />
          </Box>
          <Box>
            <Button variant="contained" color="primary" type="submit">
              Import
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
