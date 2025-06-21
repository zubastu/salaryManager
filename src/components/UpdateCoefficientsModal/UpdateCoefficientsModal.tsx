import styles from "./styles.module.scss";
import Modal from "../Modal/Modal.tsx";
import { useAppSelector } from "../../hooks/store.ts";
import UpdateCoefficientForm from "../UpdateCoefficientsForm/UpdateCoefficientsForm.tsx";

const UpdateCoefficientsModal = () => {
  const { isOpen } = useAppSelector((store) => store.updateCoefficientsModal);
  return (
    <Modal isOpen={isOpen}>
      <section className={styles.container}>
        <UpdateCoefficientForm />
      </section>
    </Modal>
  );
};

export default UpdateCoefficientsModal;
