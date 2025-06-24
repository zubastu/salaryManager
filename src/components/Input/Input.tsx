import { useFormContext, RegisterOptions } from "react-hook-form";

import styles from "./styles.module.scss";
import { FC, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
  validation?: RegisterOptions;
  onBlur?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const Input: FC<InputProps> = ({
  name,
  placeholder,
  validation,
  type = "text",
  disabled = false,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <input
        className={styles.input}
        type={type}
        {...register(name, validation)}
        disabled={disabled}
        placeholder={placeholder}
        {...rest}
      />
      {errors[name] && (
        <div className={styles.error}>
          <p className={styles.errorMessage}>
            {errors[name]?.message as string}
          </p>
        </div>
      )}
    </>
  );
};

export default Input;
