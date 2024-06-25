import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

type TModal = {
  children: ReactNode;
};

const Modal: FC<TModal> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Modal;
