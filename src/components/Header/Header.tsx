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

  const handleOpenMobileModal = () => {
    dispatch(openNavModal());
  };

  return (
    <header className={styles.header}>
      {data?.role_id === 1 ? <NavigationLinks /> : <div></div>}
      <div className={styles.desktopContainer}>
        <p className={styles.greetings}>Привет, {data?.name}</p>
        <Button
          type="button"
          label="Выход"
          extraStyles={styles.exitButton}
          onClick={handleLogoutClick}
        />
      </div>
      <div className={styles.mobileContainer}>
        <p className={styles.greetings}>Привет, {data?.name}</p>
        <Button
          className={styles.headerModalButton}
          onClick={handleOpenMobileModal}
        ></Button>
      </div>
    </header>
  );
};

export default Header;
