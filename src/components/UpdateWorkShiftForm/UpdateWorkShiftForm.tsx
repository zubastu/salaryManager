import styles from "./styles.module.scss";
import FormGroup from "../FormGroup/FormGroup.tsx";
import Input from "../Input/Input.tsx";
import { validation } from "../../utils/validation.ts";
import Button from "../Button/Button.tsx";
import { useEffect, useState } from "react";
import { useUpdateWorkShiftMutation } from "../../store/workShifts/workShifts.api.ts";
import { useGetUserDataQuery } from "../../store/auth/auth.api.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { SubmitHandler } from "react-hook-form";
import { TForm } from "../../types";
import { showNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";
import { getSalary } from "../../utils/getSalary.ts";
import { resetEmployee } from "../../store/employeeSelectionSlice/employeeSelectionSlice.ts";
import { closeUpdateWorkShiftModal } from "../../store/updateWorkShiftModalSlice/updateWorkShiftModalSlice.ts";
import { useGetCoefficientsQuery } from "../../store/coefficients/coeficients.api.ts";

const UpdateWorkShiftForm = () => {
  const { selectedWorkShift } = useAppSelector(
    (store) => store.updateWorkShiftModal,
  );
  const [isNightWork, setIsNightWork] = useState(
    selectedWorkShift.isNightShift,
  );

  const [
    updateWorkShift,
    { isSuccess: successUpdateWorkShift, isError: errorUpdateWorkShift },
  ] = useUpdateWorkShiftMutation();
  const { data: user } = useGetUserDataQuery();

  const { data: coefficientsData } = useGetCoefficientsQuery();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    if (user && coefficientsData && coefficientsData.pricePerHour) {
      const employee = {
        id: selectedWorkShift.user.id,
        name: selectedWorkShift.user.name,
      };

      const workShift = getSalary(
        data,
        isNightWork,
        employee,
        coefficientsData,
      );
      await updateWorkShift({
        data: workShift,
        workShiftId: selectedWorkShift.id,
      });
    }
  };

  useEffect(() => {
    if (successUpdateWorkShift) {
      dispatch(showNotify("Смена успешно обновлена!"));
      handleCloseModal();
    }
    dispatch(resetEmployee());
  }, [successUpdateWorkShift]);

  useEffect(() => {
    if (errorUpdateWorkShift) {
      dispatch(showNotify("Все поля обязательны"));
    }
  }, [errorUpdateWorkShift]);

  const handleChange = () => {
    setIsNightWork((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    dispatch(closeUpdateWorkShiftModal());
  };

  return (
    <FormGroup
      onSubmit={onSubmit}
      style={styles.form}
      isReset={successUpdateWorkShift}
    >
      <h4 className={styles.heading}>Изменение данных смены</h4>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Рабочие часы:
          <Input
            name="workHours"
            type="number"
            placeholder="Рабочие часы"
            validation={validation.ws}
            defaultValue={selectedWorkShift.workHours}
          />
        </label>
        <label className={styles.label}>
          Выручка за смену:
          <Input
            name="gain"
            type="number"
            placeholder="Выручка за смену"
            validation={validation.ws}
            defaultValue={selectedWorkShift.gain}
          />
        </label>
        <label className={styles.label}>
          Нал. расчет за смену
          <Input
            name="cash"
            type="number"
            placeholder="Наличный расчет за смену"
            validation={validation.ws}
            defaultValue={selectedWorkShift.cash}
          />
        </label>
        <label className={styles.label}>
          Расходы за смену:
          <Input
            name="costs"
            type="number"
            placeholder="Расходы за смену"
            validation={validation.ws}
            defaultValue={selectedWorkShift.costs}
          />
        </label>
        <label className={styles.label}>
          Наличные в кассе:
          <Input
            name="cash_in_case"
            type="number"
            placeholder="Наличные в кассе"
            validation={validation.ws}
            defaultValue={selectedWorkShift.cash_in_case}
          />
        </label>
        <label className={styles.label}>
          Дата смены:
          <Input
            name="date"
            type="date"
            placeholder="Дата смены"
            defaultValue={new Date(selectedWorkShift.date)
              .toISOString()
              .substr(0, 10)}
          />
        </label>
      </div>

      <div className={styles.buttonsContainer}>
        <Button
          type="button"
          onClick={handleChange}
          label={isNightWork ? "Ночная" : "Дневная"}
        />

        <Button type="submit" label="Обновить смену" />
        <Button
          type="button"
          label="Отмена"
          onClick={handleCloseModal}
          extraStyles={styles.cancel}
        />
      </div>
    </FormGroup>
  );
};

export default UpdateWorkShiftForm;
