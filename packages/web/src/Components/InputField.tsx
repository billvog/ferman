import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  FormHelperText,
  InputGroup,
  Button,
  InputRightElement,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
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
  let FieldComponent: any = Input;
  if (textarea) {
    FieldComponent = Textarea;
  }

  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={field.name}>
        <Flex align="center">
          {label}
          {props.maxLength && (
            <Text color="grey" fontSize={11} ml={2}>
              {field.value.length}/{props.maxLength}
            </Text>
          )}
        </Flex>
      </FormLabel>
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
      ) : (
        <FieldComponent
          {...field}
          {...props}
          variant="filled"
          id={field.name}
        />
      )}
      {helperText && (
        <FormHelperText fontSize={12}>{helperText}</FormHelperText>
      )}
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
