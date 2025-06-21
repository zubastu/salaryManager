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
          Смены
        </NavLink>
      </li>

      <li>
        <NavLink
          to={routes.salary}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Зарплата
        </NavLink>
      </li>

      <li>
        <NavLink
          to={routes.employeeSettings}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Сотрудники
        </NavLink>
      </li>

      <li>
        <NavLink
          to={routes.countCase}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Касса
        </NavLink>
      </li>

      <li>
        <NavLink
          to={routes.coefficients}
          className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
          }
        >
          Коэфф.
        </NavLink>
      </li>
    </ul>
  );
};

export default NavigationLinks;

/*
<li>
    <NavLink
        to={routes.countCase}
        className={({ isActive }) =>
            isActive ? styles.linkActive : styles.link
        }
    >
        Подсчет кассы
    </NavLink>
</li>*/
