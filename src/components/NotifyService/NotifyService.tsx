import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { CSSTransition } from "react-transition-group";
import { useCallback, useEffect, useRef } from "react";
import { clearNotify, hideNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";

const NotifyService = () => {
  const { isOpen, message } = useAppSelector((store) => store.notifyService);
  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(hideNotify());
  }, [dispatch]);

  const handleExited = useCallback(() => {
    dispatch(clearNotify());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        handleClose();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [handleClose, isOpen]);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={260}
      in={isOpen}
      unmountOnExit
      onExited={handleExited}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
        exitDone: styles.exitDone,
      }}
    >
      <section ref={nodeRef} className={styles.container} onClick={handleClose}>
        <p className={styles.message}>{message}</p>
      </section>
    </CSSTransition>
  );
};

export default NotifyService;
