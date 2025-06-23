import styles from "./styles.module.scss";
import { FC } from "react";
import { TCountCaseItem } from "../../types";

type TCountCaseItemProps = {
  item: TCountCaseItem;
};

const CountCaseItem: FC<TCountCaseItemProps> = ({ item }) => {
  const date = item.date.slice(0, 10);
  const isCorrectValue = item.factInCase >= item.resultCashInCase;
  console.log(
    item.factInCase >= item.resultCashInCase,
    item.factInCase,
    item.resultCashInCase,
  );
  return (
    <li className={styles.container}>
      <p className={styles.item}>
        Проверка:
        <p>{String(date).slice(0, 8)}</p>
      </p>

      <p className={styles.item}>
        Тип:
        <p>{item.isNightShift ? "Ночная" : "Дневная"}</p>
      </p>

      <p className={styles.item}>
        Расчет: <p>{item.resultCashInCase}</p>
      </p>

      <p className={`${styles.item} ${isCorrectValue ? "" : styles.incorrect}`}>
        Факт.: <p>{item.factInCase}</p>
      </p>

      <p className={`${styles.item} ${isCorrectValue ? "" : styles.incorrect}`}>
        Сотр.: <p>{item.employee}</p>
      </p>
    </li>
  );
};

export default CountCaseItem;
