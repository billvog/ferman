import FormStyles from "../css/form.module.css";
import {
  Input,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

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

  if (error) {
    console.log(error);
  }

  return (
    <div
      className={`${FormStyles.formControl} ${
        error && touched ? FormStyles.invalid : ""
      }`}
    >
      <label className={FormStyles.labelWrapper} htmlFor={field.name}>
        <div className={FormStyles.labelContent}>
          {label}
          {props.maxLength && (
            <span className={FormStyles.labelCountText}>
              {field.value.length}/{props.maxLength}
            </span>
          )}
        </div>
      </label>
      {passwordOptions?.isPassword ? (
        <InputGroup size="md">
          <Input
            {...field}
            {...props}
            pr="4.5rem"
            type={passwordOptions.showPassword ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={passwordOptions.handlePwdToggle}
            >
              {passwordOptions.showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : textarea ? (
        <textarea {...field} {...props} id={field.name} />
      ) : (
        <input
          {...field}
          {...props}
          id={field.name}
          className={FormStyles.input}
        />
      )}
      {helperText && (
        <FormHelperText fontSize={12}>{helperText}</FormHelperText>
      )}
      {error && touched && (
        <div className={FormStyles.errorContainer}>{error}</div>
      )}
    </div>
  );
};
