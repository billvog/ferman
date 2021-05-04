import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputUtils = `font-sans relative w-full outline-none border-none transition-colors ease-in-out duration-200 text-sm px-4 py-2.5 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-50`;

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label: string;
  name: string;
  type: string;
  textarea?: boolean;
  helperText?: string | JSX.Element;
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
    <div className="w-full mb-2">
      <label className="text-sm text-gray-500 select-none" htmlFor={field.name}>
        <div className="flex justify-between items-center mt-3 mb-1">
          <div className="flex items-center">
            {label}
            {props.maxLength && (
              <span className="text-gray-400 text-xs ml-2">
                {field.value.length}/{props.maxLength}
              </span>
            )}
          </div>
          {passwordOptions && (
            <div>
              <button
                className="flex items-center leading-normal border-none bg-gray-600 transition-colors text-button font-semibold cursor-pointer px-2 py-0.5 text-xs rounded-lg"
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
          className={InputUtils}
          type={passwordOptions.showPassword ? "text" : "password"}
        />
      ) : textarea ? (
        <textarea
          {...field}
          {...props}
          id={field.name}
          className={InputUtils}
        />
      ) : (
        <input {...field} {...props} id={field.name} className={InputUtils} />
      )}
      {helperText && (
        <div className="text-gray-400 mt-1 text-xs">{helperText}</div>
      )}
      {error && touched && (
        <div
          className={`text-red-500 font-semibold mt-${
            textarea ? "0.5" : "1"
          } text-sm`}
        >
          {error}
        </div>
      )}
    </div>
  );
};
