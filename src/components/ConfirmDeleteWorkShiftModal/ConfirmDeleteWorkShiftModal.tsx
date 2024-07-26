import styles from "./styles.module.scss";
import Modal from "../Modal/Modal.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import {
  useDeleteWorkShiftMutation,
  workShiftsApi,
} from "../../store/workShifts/workShifts.api.ts";
import { useEffect } from "react";
import { showNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";
import FormGroup from "../FormGroup/FormGroup.tsx";
import Input from "../Input/Input.tsx";
import { SubmitHandler } from "react-hook-form";
import Button from "../Button/Button.tsx";

import { closeConfirmModalShift } from "../../store/confirmDeleteWorkShiftModalSlice/confirmDeleteWorkShiftModalSlice.ts";

const ConfirmDeleteWorkShiftModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen, selectedWorkShiftId } = useAppSelector(
    (store) => store.confirmDeleteWorkShiftModal,
  );
  const [deleteWorkShift, { isSuccess: deleteSuccess, isError: deleteError }] =
    useDeleteWorkShiftMutation();

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(showNotify("Смена успешно удалена"));
      dispatch(workShiftsApi.util?.invalidateTags(["WorkShiftsEmployee"]));
      handleClose();
    }
    if (deleteError) {
      dispatch(showNotify("Ошибка удаления смены"));
    }
  }, [deleteSuccess, deleteError]);

  const handleSubmit: SubmitHandler<{ confirm: string }> = async (data) => {
    if (
      data.confirm.toLowerCase() === "удалить" &&
      selectedWorkShiftId !== ""
    ) {
      await deleteWorkShift(selectedWorkShiftId);
    } else {
      dispatch(showNotify("Нужно ввести 'удалить'"));
    }
  };

  const handleClose = () => {
    dispatch(closeConfirmModalShift());
  };

  return (
    <Modal isOpen={isOpen}>
      <section className={styles.container}>
        <h4>Подтверждение на удаление смены</h4>
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

export default ConfirmDeleteWorkShiftModal;
