import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { CSSTransition } from "react-transition-group";
import { useCallback, useEffect, useRef } from "react";
import { hideNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";

const NotifyService = () => {
  const { isOpen, message } = useAppSelector((store) => store.notifyService);
  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(hideNotify());
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
      timeout={2500}
      in={isOpen}
      unmountOnExit
      classNames={{
        enter: styles.enter,
      }}
    >
      <section ref={nodeRef} className={styles.container} onClick={handleClose}>
        <p className={styles.message}>{message}</p>
      </section>
    </CSSTransition>
  );
};

export default NotifyService;
