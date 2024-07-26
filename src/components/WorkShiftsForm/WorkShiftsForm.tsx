import styles from "./styles.module.scss";
import Input from "../Input/Input.tsx";
import { validation } from "../../utils/validation.ts";
import Button from "../Button/Button.tsx";
import FormGroup from "../FormGroup/FormGroup.tsx";
import { SubmitHandler } from "react-hook-form";
import { TForm } from "../../types";
import { showNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";
import { getSalary } from "../../utils/getSalary.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { useEffect, useState } from "react";
import { usePostWorkShiftMutation } from "../../store/workShifts/workShifts.api.ts";
import { resetEmployee } from "../../store/employeeSelectionSlice/employeeSelectionSlice.ts";
import { useGetUserDataQuery } from "../../store/auth/auth.api.ts";

const WorkShiftsForm = () => {
  const [isNightWork, setIsNightWork] = useState(false);

  const [
    postWorkShift,
    { isSuccess: successPostWorkShift, isError: errorPostWorkShift },
  ] = usePostWorkShiftMutation();
  const { data: user } = useGetUserDataQuery();

  const dispatch = useAppDispatch();

  const { selectedEmployee } = useAppSelector(
    (store) => store.selectedEmployee,
  );

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    if (user?.role_id === 1 && selectedEmployee.id === "") {
      dispatch(showNotify("Нужно выбрать сотрудника"));
      return;
    }
    if (user) {
      const employee = user?.role_id === 1 ? selectedEmployee : user;
      const workShift = getSalary(data, isNightWork, employee);
      await postWorkShift(workShift);
    }
  };

  useEffect(() => {
    if (successPostWorkShift) {
      dispatch(resetEmployee());
      dispatch(showNotify("Смена успешно зарегистрирована!"));
    }
    dispatch(resetEmployee());
  }, [successPostWorkShift]);

  useEffect(() => {
    if (errorPostWorkShift) {
      dispatch(showNotify("Все поля обязательны"));
    }
  }, [errorPostWorkShift]);

  const handleChange = () => {
    setIsNightWork((prevState) => !prevState);
  };

  return (
    <FormGroup
      onSubmit={onSubmit}
      style={styles.form}
      isReset={successPostWorkShift}
    >
      <div className={styles.inputContainer}>
        <Input
          name="workHours"
          type="number"
          placeholder="Рабочие часы"
          validation={validation.ws}
        />
        <Input
          name="gain"
          type="number"
          placeholder="Выручка за смену"
          validation={validation.ws}
        />
        <Input
          name="cash"
          type="number"
          placeholder="Наличный расчет за смену"
          validation={validation.ws}
        />
        <Input
          name="costs"
          type="number"
          placeholder="Расходы за смену"
          validation={validation.ws}
        />
        <Input
          name="cash_in_case"
          type="number"
          placeholder="Наличные в кассе"
          validation={validation.ws}
        />
        <Input
          name="date"
          type="date"
          placeholder="Дата смены"
          defaultValue={new Date().toISOString().substr(0, 10)}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <Button
          type="button"
          onClick={handleChange}
          label={isNightWork ? "Ночная" : "Дневная"}
        />

        <Button type="submit" label="Добавить смену" />
      </div>
    </FormGroup>
  );
};

export default WorkShiftsForm;
