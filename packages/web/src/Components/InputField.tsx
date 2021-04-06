import FormStyles from "../css/form.module.css";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label: string;
  name: string;
  textarea?: boolean;
  helperText?: string;
  // password field options
  passwordOptions?: {
    isPassword: boolean;
    showPassword: boolean;
    handlePwdToggle: () => any;
  };
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  helperText,
  passwordOptions,
  size: _,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  return (
    <div
      className={`${FormStyles.formControl} ${
        error && touched ? FormStyles.invalid : ""
      }`}
    >
      <label className={FormStyles.labelWrapper} htmlFor={field.name}>
        <div className={FormStyles.labelContent}>
          <div>
            {label}
            {props.maxLength && (
              <span className={FormStyles.labelCountText}>
                {field.value.length}/{props.maxLength}
              </span>
            )}
          </div>
          {passwordOptions && (
            <div>
              <button
                className={FormStyles.togglePassword}
                onClick={passwordOptions.handlePwdToggle}
                type="button"
              >
                {passwordOptions.showPassword ? (
                  <>
                    <span style={{ marginRight: 5 }}>Hide</span>
                    <AiOutlineEyeInvisible />
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: 5 }}>Show</span>
                    <AiOutlineEye />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </label>
      {passwordOptions?.isPassword ? (
        <input
          {...field}
          {...props}
          id={field.name}
          className={FormStyles.input}
          type={passwordOptions.showPassword ? "text" : "password"}
        />
      ) : textarea ? (
        <textarea
          {...field}
          {...props}
          id={field.name}
          className={FormStyles.input}
        />
      ) : (
        <input
          {...field}
          {...props}
          id={field.name}
          className={FormStyles.input}
        />
      )}
      {helperText && <div className={FormStyles.helperText}>{helperText}</div>}
      {error && touched && (
        <div className={FormStyles.errorContainer}>{error}</div>
      )}
    </div>
  );
};
