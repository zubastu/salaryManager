import styles from "./styles.module.scss";
import { FC } from "react";
import Button from "../Button/Button.tsx";

export const Tab: FC<{
  active: boolean;
  value: string;
  onClick: () => void;
}> = ({ active, value, onClick }) => {
  return (
    <Button
      type="button"
      label={value}
      onClick={onClick}
      extraStyles={active ? styles.tabActive : styles.tab}
    />
  );
};
