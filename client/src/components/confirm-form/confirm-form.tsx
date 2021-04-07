import { FormikProps, FormikValues, useFormik } from "formik";
import React from "react";
import { ConfirmBase, ConfirmBaseProps } from "../confirm-base/confirm-base";

interface ConfirmFormProps<Values extends FormikValues = FormikValues>
  extends Omit<ConfirmBaseProps, "content" | "onOk"> {
  initialValues: Values;
  renderForm: (formik: FormikProps<Values>) => JSX.Element;
  onSubmit: (values: Values) => void | Promise<any>;
}

export function ConfirmForm<T>(props: ConfirmFormProps<T>) {
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: (values, formikHelpers) => {
      props.onSubmit(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <ConfirmBase
      {...props}
      onOk={() => {
        formik.handleSubmit();
      }}
      onCancel={() => {
        formik.resetForm();
        props.onCancel?.();
      }}
      content={props.renderForm(formik)}
    />
  );
}
