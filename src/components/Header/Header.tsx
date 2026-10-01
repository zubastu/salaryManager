import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { routes } from "../../utils/routes.ts";
import Button from "../Button/Button.tsx";
import { authApi, useGetUserDataQuery } from "../../store/auth/auth.api.ts";
import { useAppDispatch } from "../../hooks/store.ts";
import NavigationLinks from "../NavigationLinks/NavigationLinks.tsx";
import { openNavModal } from "../../store/navigationPopupSlice/navigationPopupSlice.ts";

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
      <div className={styles.inner}>
        <button className={styles.brand} type="button" onClick={() => navigate(routes.workShifts)}>
          <span className={styles.brandMark}>S</span>
          <span className={styles.brandText}>Salary Manager</span>
        </button>

        {data?.role_id === 1 && <NavigationLinks />}

        <div className={styles.account}>
          <div className={styles.userBadge} aria-hidden="true">
            {(data?.name || "U").slice(0, 1).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{data?.name || "Пользователь"}</span>
            <span className={styles.userRole}>{data?.role_id === 1 ? "Администратор" : "Сотрудник"}</span>
          </div>
          <Button type="button" label="Выйти" extraStyles={styles.exitButton} onClick={handleLogoutClick} />
          <button className={styles.menuButton} type="button" onClick={() => dispatch(openNavModal())} aria-label="Открыть меню">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
