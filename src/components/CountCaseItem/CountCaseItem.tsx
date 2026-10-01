import styles from "./styles.module.scss";
import { FC } from "react";
import { TCountCaseItem } from "../../types";

type TCountCaseItemProps = { item: TCountCaseItem };

const CountCaseItem: FC<TCountCaseItemProps> = ({ item }) => {
  const date = item.date.slice(0, 10);
  const isCorrectValue = item.factInCase >= item.resultCashInCase;

  return (
    <li className={styles.container}>
      <div className={styles.item}><span>Дата</span><p>{date}</p></div>
      <div className={styles.item}><span>Тип смены</span><p>{item.isNightShift ? "Ночная" : "Дневная"}</p></div>
      <div className={styles.item}><span>Расчёт</span><p>{item.resultCashInCase} ₽</p></div>
      <div className={`${styles.item} ${isCorrectValue ? "" : styles.incorrect}`}><span>Факт</span><p>{item.factInCase} ₽</p></div>
      <div className={`${styles.item} ${isCorrectValue ? "" : styles.incorrect}`}><span>Сотрудник</span><p>{item.employee}</p></div>
    </li>
  );
};

export default CountCaseItem;
