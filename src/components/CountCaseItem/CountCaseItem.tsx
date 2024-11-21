import styles from "./styles.module.scss";
import { FC } from "react";
import { TCountCaseItem } from "../../types";

type TCountCaseItemProps = {
  item: TCountCaseItem;
};

const CountCaseItem: FC<TCountCaseItemProps> = ({ item }) => {
  const date = item.date.slice(0, 10);
  const isCorrectValue = item.factInCase >= item.resultCashInCase;
  return (
    <li className={styles.container}>
      <p>
        Дата: {String(date)} {item.isNightShift ? "Ночная" : "Дневная"}
      </p>
      <p>Расчет: {item.resultCashInCase}</p>
      <p className={isCorrectValue ? "" : styles.incorrect}>
        Фактически: {item.factInCase}
      </p>
      <p className={isCorrectValue ? "" : styles.incorrect}>
        Сотрудник: {item.employee}
      </p>
    </li>
  );
};

export default CountCaseItem;
