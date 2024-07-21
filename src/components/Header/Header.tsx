import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { routes } from "../../utils/routes.ts";
import Button from "../Button/Button.tsx";
import { authApi, useGetUserDataQuery } from "../../store/auth/auth.api.ts";
import { useAppDispatch } from "../../hooks/store.ts";

const Header = () => {
  const { data } = useGetUserDataQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogoutClick = () => {
    navigate(routes.login);
    localStorage.clear();
    dispatch(authApi.util.invalidateTags(["Auth"]));
  };

  return (
    <header className={styles.header}>
      {data?.role_id === 1 ? (
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
      ) : (
        <div></div>
      )}
      <div className={styles.authContainer}>
        <p className={styles.greetings}>Привет, {data?.name}</p>
        <Button
          type="button"
          label="Выход"
          extraStyles={styles.exitButton}
          onClick={handleLogoutClick}
        />
      </div>
    </header>
  );
};

export default Header;
