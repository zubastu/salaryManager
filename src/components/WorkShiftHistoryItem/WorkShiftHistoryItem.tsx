import styles from "./styles.module.scss";
import { FC } from "react";
import { TWorkShift } from "../../types";
import { useDeleteWorkShiftMutation } from "../../store/workShifts/workShifts.api.ts";
import Button from "../Button/Button.tsx";

type TWorkShiftHistoryItem = {
  workShift: TWorkShift;
};
const WorkShiftHistoryItem: FC<TWorkShiftHistoryItem> = ({ workShift }) => {
  const [deleteWorkShift, {}] = useDeleteWorkShiftMutation();
  const handleDelete = async () => {
    await deleteWorkShift(workShift.id);
  };

  return (
    <li className={styles.listItem}>
      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Имя:</p>
        <p className={styles.listItemPropValue}>{workShift.employee.name}</p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Часы работы:</p>
        <p className={styles.listItemPropValue}>{workShift.workHours}</p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Выручка:</p>
        <p className={styles.listItemPropValue}>{workShift.gain}</p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Зарплата за смену:</p>
        <p className={styles.listItemPropValue}>{workShift.salary}</p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Наличный расчет за смену:</p>
        <p className={styles.listItemPropValue}>{workShift.cash}</p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Наличные в кассе:</p>
        <p className={styles.listItemPropValue}>{workShift.cash_in_case}</p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Расходы из кассы:</p>
        <p className={styles.listItemPropValue}>{workShift.costs}</p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Дата:</p>
        <p className={styles.listItemPropValue}>
          {String(new Date(workShift.date).toLocaleString().substr(0, 10))}
        </p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Смена:</p>
        <p className={styles.listItemPropValue}>
          {workShift.isNightShift ? "Ночная" : "Дневная"}
        </p>
      </div>

      <div className={styles.removeButtonContainer}>
        <Button label="X" onClick={handleDelete} extraStyles={styles.remove} />
      </div>
    </li>
  );
};

export default WorkShiftHistoryItem;