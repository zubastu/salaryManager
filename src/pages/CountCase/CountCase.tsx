import styles from "./styles.module.scss";
import { useLazyGetAllWorkShiftsBetweenDatesQuery } from "../../store/workShifts/workShifts.api.ts";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import FormGroup from "../../components/FormGroup/FormGroup.tsx";
import { useEffect, useState } from "react";
import { TWorkShift } from "../../types";
import { SubmitHandler } from "react-hook-form";
import { TDateForm } from "../CountSalary/CountSalary.tsx";
import { dayHours, nightHours } from "../../utils/constants.ts";
import { countHelper } from "../../utils/countHelper.ts";

const CountCase = () => {
  const [getWorkShifts, { data: workShiftsData }] =
    useLazyGetAllWorkShiftsBetweenDatesQuery();
  const [dates, setDates] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });
  const [workShifts, setWorkShifts] = useState<TWorkShift[]>([]);

  const [result, setResult] = useState<any>([]);
  console.log(workShifts, dates);
  const handleSubmit: SubmitHandler<TDateForm> = (data) => {
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
      setWorkShifts(workShiftsData);
      setResult(countHelper([...workShiftsData].reverse()));
    }
  }, [workShiftsData]);

  return (
    <section className={styles.container}>
      <FormGroup onSubmit={handleSubmit}>
        <Input name="from" placeholder="С даты" type="date" />
        <Input name="to" placeholder="По дату" type="date" />
        <Button label="Расчитать" />
      </FormGroup>

      {result && <div>{JSON.stringify(result)}</div>}
    </section>
  );
};

export default CountCase;
