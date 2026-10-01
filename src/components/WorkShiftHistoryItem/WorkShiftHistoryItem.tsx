import styles from "./styles.module.scss";
import { FC } from "react";
import { TWorkShift } from "../../types";
import Button from "../Button/Button.tsx";
import { useGetUserDataQuery } from "../../store/auth/auth.api.ts";
import { useAppDispatch } from "../../hooks/store.ts";
import { openConfirmModalShift } from "../../store/confirmDeleteWorkShiftModalSlice/confirmDeleteWorkShiftModalSlice.ts";
import { openUpdateWorkShiftModal } from "../../store/updateWorkShiftModalSlice/updateWorkShiftModalSlice.ts";

type TWorkShiftHistoryItem = { workShift: TWorkShift };

const WorkShiftHistoryItem: FC<TWorkShiftHistoryItem> = ({ workShift }) => {
  const { data: user } = useGetUserDataQuery();
  const dispatch = useAppDispatch();

  const date = new Date(workShift.date).toLocaleDateString("ru-RU");

  return (
    <li className={styles.container}>
      <div className={styles.listItem}>
        <div className={styles.wrapper}><span className={styles.listItemPropName}>Сотрудник</span><strong className={styles.listItemPropValue}>{workShift.user.name}</strong></div>
        <div className={styles.wrapper}><span className={styles.listItemPropName}>Часы</span><strong className={styles.listItemPropValue}>{workShift.workHours}</strong></div>
        <div className={styles.wrapper}><span className={styles.listItemPropName}>Выручка</span><strong className={styles.listItemPropValue}>{workShift.gain} ₽</strong></div>
        <div className={styles.wrapper}><span className={styles.listItemPropName}>ЗП за смену</span><strong className={styles.listItemPropValue}>{workShift.salary} ₽</strong></div>
        <div className={styles.wrapper}><span className={styles.listItemPropName}>Наличные</span><strong className={styles.listItemPropValue}>{workShift.cash} ₽</strong></div>
        <div className={styles.wrapper}><span className={styles.listItemPropName}>В кассе</span><strong className={styles.listItemPropValue}>{workShift.cash_in_case} ₽</strong></div>
        <div className={styles.wrapper}><span className={styles.listItemPropName}>Расходы</span><strong className={styles.listItemPropValue}>{workShift.costs} ₽</strong></div>
        <div className={styles.wrapper}><span className={styles.listItemPropName}>Дата</span><strong className={styles.listItemPropValue}>{date}</strong></div>
        <div className={styles.wrapper}><span className={styles.listItemPropName}>Смена</span><strong className={styles.listItemPropValue}>{workShift.isNightShift ? "Ночная" : "Дневная"}</strong></div>
      </div>
      {user?.role_id === 1 && (
        <div className={styles.removeButtonContainer}>
          <Button aria-label="Удалить смену" label="×" type="button" onClick={() => dispatch(openConfirmModalShift(workShift.id))} extraStyles={styles.removeButton} />
          <Button aria-label="Изменить смену" label="⋯" type="button" onClick={() => dispatch(openUpdateWorkShiftModal(workShift))} extraStyles={styles.updateButton} />
        </div>
      )}
    </li>
  );
};

export default WorkShiftHistoryItem;
