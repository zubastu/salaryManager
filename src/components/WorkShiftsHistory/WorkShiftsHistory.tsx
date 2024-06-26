import styles from "./styles.module.scss";
import WorkShiftHistoryItem from "../WorkShiftHistoryItem/WorkShiftHistoryItem.tsx";
import { FC } from "react";
import { TWorkShift } from "../../types";

type TWorkShiftsHistory = {
  data: TWorkShift[];
  title: string;
};

const WorkShiftsHistory: FC<TWorkShiftsHistory> = ({ data, title }) => {
  return (
    <section className={styles.container}>
      <h4 className={styles.heading}>{title}</h4>
      <ul className={styles.list}>
        {data?.map((workShift) => (
          <WorkShiftHistoryItem workShift={workShift} key={workShift.id} />
        ))}
      </ul>
    </section>
  );
};

export default WorkShiftsHistory;
