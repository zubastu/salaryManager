import styles from "./styles.module.scss";
import Modal from "../Modal/Modal.tsx";

const UpdateWorkShiftModal = () => {
  return (
    <Modal isOpen={false}>
      <section className={styles.container}></section>
    </Modal>
  );
};

export default UpdateWorkShiftModal;
