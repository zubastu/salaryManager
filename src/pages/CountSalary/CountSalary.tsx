import styles from "./styles.module.scss";
import EmployeesList from "../../components/EmployeesList/EmployeesList.tsx";
import { useEffect, useState } from "react";
import { resetEmployee } from "../../store/employeeSelectionSlice/employeeSelectionSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import FormGroup from "../../components/FormGroup/FormGroup.tsx";
import Input from "../../components/Input/Input.tsx";
import WorkShiftsHistory from "../../components/WorkShiftsHistory/WorkShiftsHistory.tsx";
import Button from "../../components/Button/Button.tsx";
import {
  useLazyGetEmployeeWorkShiftsBetweenDatesQuery,
  workShiftsApi,
} from "../../store/workShifts/workShifts.api.ts";
import { SubmitHandler } from "react-hook-form";
import { TWorkShift } from "../../types";
import useWindowDimensions from "../../hooks/resize.ts";
import { Tab } from "../../components/Tab/Tab.tsx";
import { showNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";
import { getCurrentMonthDates } from "../../utils/datesHelper.ts";

export type TDateForm = {
  from: string;
  to: string;
};

const CountSalary = () => {
  const { first, fifteenth, sixteenth, last } = getCurrentMonthDates();
  const [
    getShifts,
    { data: workShiftsResponse, isSuccess: workShiftsResponseSuccess },
  ] = useLazyGetEmployeeWorkShiftsBetweenDatesQuery();
  const [workShifts, setWorkShifts] = useState<TWorkShift[]>([]);
  const [salary, setSalary] = useState(0);
  const [workHours, setWorkHours] = useState(0);
  const [from, setFrom] = useState<string>(first);
  const [to, setTo] = useState<string>(last);
  const [tabValue, setTabValue] = useState<"form" | "result">("form");
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();

  const { selectedEmployee } = useAppSelector(
    (store) => store.selectedEmployee,
  );

  const isEmployeeSelected = Boolean(selectedEmployee.id);
  const isDatesSelected = Boolean(from !== "" || to !== "");
  const isMobile = width <= 1120;

  useEffect(() => {
    dispatch(resetEmployee());
  }, []);

  const handleSubmit: SubmitHandler<TDateForm> = async () => {
    if (isEmployeeSelected) {
      dispatch(workShiftsApi.util?.invalidateTags(["WorkShiftsEmployee"]));
      await getShifts({
        user_id: selectedEmployee.id,
        startDate: from + " 00:59:59:0000",
        endDate: to + " 23:59:59:0000",
      });

      isMobile && setTabValue("result");
    } else {
      dispatch(showNotify("Необходимо выбрать сотрудника"));
    }
  };

  useEffect(() => {
    workShiftsResponseSuccess && setWorkShifts(workShiftsResponse);
  }, [workShiftsResponse, workShiftsResponseSuccess]);

  useEffect(() => {
    if (workShifts) {
      const totalWorkHours = workShifts.reduce((acc, shift) => {
        return acc + Number(shift.workHours);
      }, 0);

      const totalSalary = workShifts.reduce((acc, shift) => {
        return acc + shift.salary;
      }, 0);
      setSalary(totalSalary);
      setWorkHours(totalWorkHours);
    }
  }, [workShifts]);

  const setFirstFifteen = () => {
    setFrom(first);
    setTo(fifteenth);
  };
  const setSixteenLast = () => {
    setFrom(sixteenth);
    setTo(last);
  };

  return (
    <section className={styles.container}>
      {isMobile && (
        <div className={styles.tabs}>
          <Tab
            onClick={() => {
              setTabValue("form");
            }}
            value="Выбрать даты"
            active={tabValue === "form"}
          />
          <Tab
            onClick={() => {
              setTabValue("result");
            }}
            value="Посмотреть реузльтат"
            active={tabValue === "result"}
          />
        </div>
      )}
      {!isMobile && (
        <div className={styles.formContainer}>
          <EmployeesList />
          <FormGroup onSubmit={handleSubmit}>
            <Input
              name="from"
              placeholder="С даты"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <Input
              name="to"
              placeholder="По дату"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <Button onClick={setFirstFifteen} label="c 1 по 15 число" />
            <Button onClick={setSixteenLast} label="с 16 до конца месяца" />
            <Button label="Расчитать" />
          </FormGroup>
        </div>
      )}
      {!isMobile && (
        <div className={styles.resultContainer}>
          {isEmployeeSelected && isDatesSelected ? (
            <div className={styles.salaryContainer}>
              <h3 className={styles.heading}>
                Сотрудник: {selectedEmployee.name}
              </h3>
              <p>
                Период: с {from} по {to}
              </p>
              <p>Часов отработал: {workHours}</p>
              <p>Заработал: {salary} р</p>
            </div>
          ) : (
            <h3>Необходимо выбрать сотрудника и даты</h3>
          )}
          {workShifts && (
            <WorkShiftsHistory data={workShifts} title="Смены в расчете" />
          )}
        </div>
      )}
      {isMobile && tabValue === "form" && (
        <div className={styles.formContainer}>
          <EmployeesList />
          <FormGroup onSubmit={handleSubmit}>
            <Input
              name="from"
              placeholder="С даты"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <Input
              name="to"
              placeholder="По дату"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <Button onClick={setFirstFifteen} label="c 1 по 15 число" />
            <Button onClick={setSixteenLast} label="с 16 до конца месяца" />
            <Button label="Расчитать" />
          </FormGroup>
        </div>
      )}

      {isMobile && tabValue === "result" && (
        <div className={styles.resultContainer}>
          <div className={styles.salaryContainer}>
            <h3 className={styles.heading}>
              Сотрудник: {selectedEmployee.name}
            </h3>
            <p>
              Период: с {from} по {to}
            </p>
            <p>Часов отработал: {workHours}</p>
            <p>Заработал: {salary} р</p>
          </div>
          {workShifts && (
            <WorkShiftsHistory data={workShifts} title="Смены в расчете" />
          )}
        </div>
      )}
    </section>
  );
};

export default CountSalary;
