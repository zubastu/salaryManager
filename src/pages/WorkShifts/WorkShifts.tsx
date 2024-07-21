import styles from "./styles.module.scss";
import FormGroup from "../../components/FormGroup/FormGroup.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import { useEffect, useState } from "react";
import { TForm } from "../../types";
import { SubmitHandler } from "react-hook-form";
import { getSalary } from "../../utils/getSalary.ts";
import WorkShiftsHistory from "../../components/WorkShiftsHistory/WorkShiftsHistory.tsx";
import EmployeesList from "../../components/EmployeesList/EmployeesList.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import {
  useGetAllWorkShiftsQuery,
  usePostWorkShiftMutation,
} from "../../store/workShifts/workShifts.api.ts";
import { resetEmployee } from "../../store/employeeSelectionSlice/employeeSelectionSlice.ts";
import { useGetUserDataQuery } from "../../store/auth/auth.api.ts";
import { sortCallback } from "../../utils/sortHelper.ts";
import { Tab } from "../../components/Tab/Tab.tsx";
import useWindowDimensions from "../../hooks/resize.ts";
//import { getCountOfSalaryByEmployeeNames } from "./utils/getCountOfSalaryByEmployeeNames.ts";

const WorkShifts = () => {
  const [isNightWork, setIsNightWork] = useState(false);
  const [tabValue, setTabValue] = useState<"workShifts" | "history">(
    "workShifts",
  );
  const { width } = useWindowDimensions();

  const [postWorkShift, { isSuccess: successPostWorkShift }] =
    usePostWorkShiftMutation();
  const { data } = useGetAllWorkShiftsQuery();
  const { data: user } = useGetUserDataQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (successPostWorkShift) {
      dispatch(resetEmployee());
    }
    dispatch(resetEmployee());
  }, [successPostWorkShift]);

  const { selectedEmployee } = useAppSelector(
    (store) => store.selectedEmployee,
  );

  const handleChange = () => {
    setIsNightWork((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    if (user) {
      const employee = user?.role_id === 1 ? selectedEmployee : user;
      const workShift = getSalary(data, isNightWork, employee);
      await postWorkShift(workShift);
    }
  };

  const newData = data && [...data].sort((a, b) => sortCallback(a, b));

  const isMobile = width <= 1180;

  return (
    <section className={styles.container}>
      <div className={styles.formWrapper}>
        {user?.role_id === 1 && !isMobile && <EmployeesList />}
        {user?.role_id === 1 && isMobile && tabValue === "workShifts" && (
          <EmployeesList />
        )}

        {isMobile && (
          <div className={styles.tabs}>
            <Tab
              onClick={() => {
                setTabValue("workShifts");
              }}
              value="Подать смену"
              active={tabValue === "workShifts"}
            />
            <Tab
              onClick={() => {
                setTabValue("history");
              }}
              value="История"
              active={tabValue === "history"}
            />
          </div>
        )}

        {!isMobile && (
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
              />
              <Input name="gain" type="number" placeholder="Выручка за смену" />
              <Input
                name="cash"
                type="number"
                placeholder="Наличный расчет за смену"
              />
              <Input
                name="costs"
                type="number"
                placeholder="Расходы за смену"
              />
              <Input
                name="cash_in_case"
                type="number"
                placeholder="Наличные в кассе"
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
        )}

        {isMobile && tabValue === "workShifts" && (
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
              />
              <Input name="gain" type="number" placeholder="Выручка за смену" />
              <Input
                name="cash"
                type="number"
                placeholder="Наличный расчет за смену"
              />
              <Input
                name="costs"
                type="number"
                placeholder="Расходы за смену"
              />
              <Input
                name="cash_in_case"
                type="number"
                placeholder="Наличные в кассе"
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
        )}

        {data && newData && isMobile && tabValue === "history" && (
          <WorkShiftsHistory data={newData} title="История рабочих смен" />
        )}
      </div>
      {data && newData && !isMobile && (
        <WorkShiftsHistory data={newData} title="История рабочих смен" />
      )}
    </section>
  );
};

export default WorkShifts;
