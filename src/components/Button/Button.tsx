import { ButtonHTMLAttributes, FC } from "react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
  extraStyles?: string;
}

const Button: FC<ButtonProps> = (props) => {
  const { label, disabled, type = "submit", extraStyles, ...rest } = props;
  return (
    <button
      className={`${styles.submitButton} ${extraStyles}`}
      type={type}
      disabled={disabled ? disabled : false}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
