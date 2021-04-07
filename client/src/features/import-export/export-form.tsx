import {
  FormHelperText,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { FormikProps } from "formik";
import React from "react";
import * as yup from "yup";

interface ExportFormProps {
  formik: FormikProps<{ title: string; description: string }>;
  labels: {
    title_label: string;
    description_label: string;
    description_helper: string;
  };
}

const textareaStyle = { maxWidth: "100%", minWidth: "100%", width: "100%" };

export const validationSchema = yup
  .object()
  .shape({ title: yup.string().required() });

export const ExportForm: React.FC<ExportFormProps> = ({ formik, labels }) => {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <TextField
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          label={labels.title_label}
          variant="outlined"
          size="small"
          error={Boolean(formik.errors.title && formik.touched.title)}
          helperText={formik.errors.title}
        />
      </Grid>

      <Grid item xs={12} container direction="column">
        <TextareaAutosize
          id="description"
          placeholder={labels.description_label}
          value={formik.values.description}
          onChange={formik.handleChange}
          rowsMin={10}
          style={textareaStyle}
        />
        <FormHelperText>{labels.description_helper}</FormHelperText>
      </Grid>
    </Grid>
  );
};
