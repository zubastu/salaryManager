import styles from "./styles.module.scss";
import Modal from "../Modal/Modal.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { closeConfirmModalEmployee } from "../../store/confirmDeleteEmployeeModalSlice/confirmDeleteEmployeeModalSlice.ts";
import FormGroup from "../FormGroup/FormGroup.tsx";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import { SubmitHandler } from "react-hook-form";
import { showNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";
import { useEffect } from "react";
import { resetEmployee } from "../../store/employeeSelectionSlice/employeeSelectionSlice.ts";
import { useDeleteEmployeeMutation } from "../../store/employees/employees.api.ts";

const ConfirmDeleteEmployeeModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, selectedEmployeeId } = useAppSelector(
    (store) => store.confirmDeleteEmployeeModal,
  );

  const [
    deleteEmployee,
    { isSuccess: isSuccessDelete, isError: isErrorDelete },
  ] = useDeleteEmployeeMutation();

  const handleSubmit: SubmitHandler<{ confirm: string }> = async (data) => {
    if (data.confirm.toLowerCase() === "удалить" && selectedEmployeeId !== "") {
      await deleteEmployee(selectedEmployeeId);
    } else {
      dispatch(showNotify("Нужно ввести 'удалить'"));
    }
  };

  useEffect(() => {
    if (isSuccessDelete) {
      dispatch(resetEmployee());
      dispatch(showNotify("Сотрудник успешно удален"));
      handleClose();
    }
  }, [isSuccessDelete]);

  useEffect(() => {
    if (isErrorDelete) {
      dispatch(showNotify("Ошибка удаления сотрудника"));
    }
  }, [isErrorDelete]);

  const handleClose = () => {
    dispatch(closeConfirmModalEmployee());
  };

  return (
    <Modal isOpen={isOpen}>
      <section className={styles.container}>
        <h4 className={styles.heading}>Подтверждение на удаление сотрудника</h4>
        <FormGroup onSubmit={handleSubmit} style={styles.form}>
          <Input name="confirm" placeholder="Введите удалить" />
          <Button
            label="Подтверидть"
            type="submit"
            extraStyles={styles.confirmButton}
          />
          <Button label="Отменить" type="button" onClick={handleClose} />
        </FormGroup>
      </section>
    </Modal>
  );
};

export default ConfirmDeleteEmployeeModal;
