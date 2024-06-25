import styles from "./styles.module.scss";
import FormGroup from "../../components/FormGroup/FormGroup.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import { useState } from "react";
import { TForm, TWorkShiftProperties } from "../../types";
import { SubmitHandler } from "react-hook-form";
import { getSalary } from "../../utils/getSalary.ts";
import WorkShiftsHistory from "../../components/WorkShiftsHistory/WorkShiftsHistory.tsx";
import EmployeesList from "../../components/EmployeesList/EmployeesList.tsx";
//import { getCountOfSalaryByEmployeeNames } from "./utils/getCountOfSalaryByEmployeeNames.ts";

const WorkShifts = () => {
  const [workShifts, setWorkShifts] = useState<TWorkShiftProperties[]>([]);
  const [isNightWork, setIsNightWork] = useState(false);

  const handleChange = () => {
    setIsNightWork((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<TForm> = (data) => {
    setWorkShifts([...workShifts, getSalary(data, isNightWork)]);
  };

  return (
    <section className={styles.container}>
      <div className={styles.formWrapper}>
        <EmployeesList />

        <FormGroup onSubmit={onSubmit} style={styles.form}>
          <div className={styles.inputContainer}>
            <Input name="workHours" type="number" placeholder="Рабочие часы" />
            <Input name="gain" type="number" placeholder="Общая прибыль" />
            <Input name="cash" type="number" placeholder="Фактически в кассе" />
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
      </div>

      <WorkShiftsHistory />
    </section>
  );
};

export default WorkShifts;
