import styles from "./styles.module.scss";
import Modal from "../Modal/Modal.tsx";
import UpdateWorkShiftForm from "../UpdateWorkShiftForm/UpdateWorkShiftForm.tsx";
import { useAppSelector } from "../../hooks/store.ts";

const UpdateWorkShiftModal = () => {
  const { isOpen, selectedWorkShift } = useAppSelector(
    (store) => store.updateWorkShiftModal,
  );
  return (
    <Modal isOpen={isOpen}>
      <section className={styles.container}>
        {selectedWorkShift.id !== "" && <UpdateWorkShiftForm />}
      </section>
    </Modal>
  );
};

export default UpdateWorkShiftModal;
