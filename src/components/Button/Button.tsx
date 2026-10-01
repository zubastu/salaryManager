import { ButtonHTMLAttributes, FC } from "react";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  extraStyles?: string;
}

const Button: FC<ButtonProps> = ({ label, disabled, type = "submit", extraStyles = "", className = "", children, ...rest }) => (
  <button
    className={[styles.button, extraStyles, className].filter(Boolean).join(" ")}
    type={type}
    disabled={disabled}
    {...rest}
  >
    {label ?? children}
  </button>
);

export default Button;
