import styles from "./styles.module.scss";
import { useLazyGetAllWorkShiftsBetweenDatesQuery } from "../../store/workShifts/workShifts.api.ts";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import FormGroup from "../../components/FormGroup/FormGroup.tsx";
import { useEffect, useState } from "react";
import { TCountCaseItem } from "../../types";
import { SubmitHandler } from "react-hook-form";
import { TDateForm } from "../CountSalary/CountSalary.tsx";
import { dayHours, nightHours } from "../../utils/constants.ts";
import { countHelper } from "../../utils/countHelper.ts";
import CountCaseItem from "../../components/CountCaseItem/CountCaseItem.tsx";
import { sortCallback } from "../../utils/sortHelper.ts";
import { showNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";
import { useAppDispatch } from "../../hooks/store.ts";

const CountCase = () => {
  const [getWorkShifts, { data: workShiftsData }] =
    useLazyGetAllWorkShiftsBetweenDatesQuery();
  const [_, setDates] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });

  const dispatch = useAppDispatch();

  const [result, setResult] = useState<TCountCaseItem[]>([]);
  const handleSubmit: SubmitHandler<TDateForm> = (data) => {
    if (data.from === "" || data.to === "") {
      dispatch(showNotify("Необходимо выбрать даты"));
    }
    getWorkShifts({
      startDate: data.from + dayHours,
      endDate: data.to + nightHours,
    });
    setDates({
      from: new Date(data.from).toLocaleDateString(),
      to: new Date(data.to).toLocaleDateString(),
    });
  };

  useEffect(() => {
    if (workShiftsData && workShiftsData.length) {
      setResult(countHelper([...workShiftsData].sort(sortCallback)));
    }
  }, [workShiftsData]);

  return (
    <section className={styles.container}>
      <FormGroup onSubmit={handleSubmit} style={styles.form}>
        <Input name="from" placeholder="С даты" type="date" />
        <Input name="to" placeholder="По дату" type="date" />
        <Button label="Расчитать" />
      </FormGroup>

      <ul className={styles.list}>
        {result?.map((item) => <CountCaseItem item={item} key={item.id} />)}
      </ul>
    </section>
  );
};

export default CountCase;
