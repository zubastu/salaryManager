import { FC, ReactNode, useRef } from "react";

import styles from "./styles.module.scss";
import { CSSTransition } from "react-transition-group";

type TModal = {
  children: ReactNode;
  isOpen: boolean;
};

const Modal: FC<TModal> = ({ children, isOpen }) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      timeout={500}
      in={isOpen}
      nodeRef={nodeRef}
      unmountOnExit
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
    >
      <div className={styles.container} ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Modal;
