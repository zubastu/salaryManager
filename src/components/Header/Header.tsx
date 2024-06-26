import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { routes } from "../../utils/routes.ts";
import Button from "../Button/Button.tsx";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(routes.login);
  };

  return (
    <header className={styles.header}>
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
      </ul>
      <div className={styles.authContainer}>
        <Button type="button" label="Войти" onClick={handleClick} />
      </div>
    </header>
  );
};

export default Header;
