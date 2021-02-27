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

interface ExportFormProps {
  onSubmit: (values: { lang: string }) => void;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const ExportForm: React.FC<ExportFormProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const initialValues: { lang: string } = {
    lang: 'en',
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
            <Button variant="contained" color="primary" type="submit">
              Export
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
