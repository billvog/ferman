import { useField } from "formik";
import FormStyles from "../css/form.module.css";
import React, { InputHTMLAttributes } from "react";

type MyCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  helperText?: string;
};

export const MyCheckbox: React.FC<MyCheckboxProps> = ({
  label,
  helperText,
  size: _,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <div
      className={`${FormStyles.formControl} ${
        error && touched ? FormStyles.invalid : ""
      } ${FormStyles.checkboxControl}`}
    >
      <label className={FormStyles.labelWrapper} htmlFor={field.name}>
        <div className={FormStyles.labelContent}>{label}</div>
      </label>
      <input
        {...field}
        {...props}
        type="checkbox"
        id={field.name}
        className={FormStyles.checkbox}
      />
      {helperText && <div className={FormStyles.helperText}>{helperText}</div>}
      {error && touched && (
        <div className={FormStyles.errorContainer}>{error}</div>
      )}
    </div>
  );
};
