import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { routes } from "../../utils/routes.ts";

const NavigationLinks = () => {
  return (
    <ul className={styles.list}>
      <li>
        <NavLink
          to={routes.workShifts}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Добавление рабочей смены
        </NavLink>
      </li>

      <li>
        <NavLink
          to={routes.salary}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Расчет зарплаты
        </NavLink>
      </li>

      <li>
        <NavLink
          to={routes.employeeSettings}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Параметры сотрудника
        </NavLink>
      </li>

      <li>
        <NavLink
          to={routes.countCase}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Подсчет кассы
        </NavLink>
      </li>
    </ul>
  );
};

export default NavigationLinks;
