import styles from "./styles.module.scss";
import { FC, useEffect } from "react";
import { TWorkShift } from "../../types";
import {
  useDeleteWorkShiftMutation,
  workShiftsApi,
} from "../../store/workShifts/workShifts.api.ts";
import Button from "../Button/Button.tsx";
import { useGetUserDataQuery } from "../../store/auth/auth.api.ts";
import { useAppDispatch } from "../../hooks/store.ts";
import { showNotify } from "../../store/notifyService/notifyServiceSlice.ts";

type TWorkShiftHistoryItem = {
  workShift: TWorkShift;
};
const WorkShiftHistoryItem: FC<TWorkShiftHistoryItem> = ({ workShift }) => {
  const [deleteWorkShift, { isSuccess: deleteSuccess, isError: deleteError }] =
    useDeleteWorkShiftMutation();
  const { data: user } = useGetUserDataQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(showNotify("Смена успешно удалена"));
      dispatch(workShiftsApi.util?.invalidateTags(["WorkShiftsEmployee"]));
    }
    if (deleteError) {
      dispatch(showNotify("Ошибка удаления смены"));
    }
  }, [deleteSuccess, deleteError]);
  const handleDelete = async () => {
    await deleteWorkShift(workShift.id);
  };

  return (
    <li className={styles.listItem}>
      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Имя:</p>
        <p className={styles.listItemPropValue}>{workShift.user.name}</p>
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
        <p className={styles.listItemPropName}>ЗП за смену:</p>
        <p className={styles.listItemPropValue}>{workShift.salary}</p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Нал. расчет за смену:</p>
        <p className={styles.listItemPropValue}>{workShift.cash}</p>
      </div>

      <div className={styles.wrapper}>
        <p className={styles.listItemPropName}>Нал. в кассе:</p>
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

      {user?.role_id === 1 && (
        <div className={styles.removeButtonContainer}>
          <Button
            label="X"
            onClick={handleDelete}
            extraStyles={styles.remove}
          />
        </div>
      )}
    </li>
  );
};

export default WorkShiftHistoryItem;
