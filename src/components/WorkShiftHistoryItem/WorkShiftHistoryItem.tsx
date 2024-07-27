import styles from "./styles.module.scss";
import { FC } from "react";
import { TWorkShift } from "../../types";

import Button from "../Button/Button.tsx";
import { useGetUserDataQuery } from "../../store/auth/auth.api.ts";
import { useAppDispatch } from "../../hooks/store.ts";
import { openConfirmModalShift } from "../../store/confirmDeleteWorkShiftModalSlice/confirmDeleteWorkShiftModalSlice.ts";
import { openUpdateWorkShiftModal } from "../../store/updateWorkShiftModalSlice/updateWorkShiftModalSlice.ts";

type TWorkShiftHistoryItem = {
  workShift: TWorkShift;
};
const WorkShiftHistoryItem: FC<TWorkShiftHistoryItem> = ({ workShift }) => {
  const { data: user } = useGetUserDataQuery();
  const dispatch = useAppDispatch();

  const handleOpenUpdateModal = () => {
    dispatch(openUpdateWorkShiftModal(workShift));
  };
  const handleOpenDeleteModal = () => {
    dispatch(openConfirmModalShift(workShift.id));
  };

  return (
    <li className={styles.container}>
      <div className={styles.listItem}>
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
      </div>
      {user?.role_id === 1 && (
        <div
          className={styles.removeButtonContainer}
          onClick={(e) => e.preventDefault()}
        >
          <Button
            label="X"
            type="button"
            onClick={handleOpenDeleteModal}
            extraStyles={styles.removeButton}
          />

          <Button
            label="•••"
            type="button"
            onClick={handleOpenUpdateModal}
            extraStyles={styles.updateButton}
          />
        </div>
      )}
    </li>
  );
};

export default WorkShiftHistoryItem;
