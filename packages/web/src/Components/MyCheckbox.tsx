import { useField } from "formik";
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
    <div className="w-full my-4">
      <div className="flex flex-row items-center leading-none">
        <input
          {...field}
          {...props}
          type="checkbox"
          id={field.name}
          className="mr-2 rounded-md"
        />
        <label
          className="text-sm text-secondary-500 select-none"
          htmlFor={field.name}
        >
          <div className="flex items-center">{label}</div>
        </label>
      </div>
      {helperText && (
        <div className="text-secondary-400 mt-1 text-xs">{helperText}</div>
      )}
      {error && touched && (
        <div className="text-red-500 font-semibold mt-1.5 text-sm">{error}</div>
      )}
    </div>
  );
};
