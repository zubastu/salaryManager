import { ButtonHTMLAttributes, FC } from "react";

import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { label, disabled, type = "submit", ...rest } = props;
  return (
    <button
      className={styles.submitButton}
      type={type}
      disabled={disabled ? disabled : false}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
