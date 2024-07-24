import { FC } from "react";
import styles from "./NavigationPopup.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../Button/Button.tsx";
import { routes } from "../../utils/routes.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { closeNavModal } from "../../store/navigationPopupSlice/navigationPopupSlice.ts";
import { authApi, useGetUserDataQuery } from "../../store/auth/auth.api.ts";
const NavigationPopup: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data } = useGetUserDataQuery();

  const handleCloseModal = () => {
    dispatch(closeNavModal());
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    dispatch(authApi.util.invalidateTags(["Auth"]));
    dispatch(closeNavModal());
  };

  const { isOpen } = useAppSelector((state) => state.navigationPopup);

  const popupClassName = isOpen
    ? `${styles.navigationPopup} ${styles.navigationPopup_type_active}`
    : styles.navigationPopup;

  const overlayClassName = isOpen
    ? `${styles.navigationPopup__overlay} ${styles.navigationPopup__overlay_type_active}`
    : styles.navigationPopup__overlay;

  const sliderClassName = isOpen
    ? `${styles.navigationPopup__links} ${styles.navigationPopup__links_type_active}`
    : styles.navigationPopup__links;

  return (
    <div className={popupClassName}>
      <div className={overlayClassName} onClick={handleCloseModal} />

      <div
        className={sliderClassName}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.navigationPopup__closeButtonContainer}>
          <Button
            onClick={handleCloseModal}
            extraStyles={styles.navigationPopup__close}
            label="X"
          />
        </div>
        <nav className={styles.navigationPopup__navigationContainer}>
          {data?.role_id === 1 && (
            <>
              <NavLink
                onClick={handleCloseModal}
                to={routes.workShifts}
                className={
                  location.pathname === routes.workShifts
                    ? `${styles.navigationPopup__link} ${styles.navigationPopup__link_type_active}`
                    : styles.navigationPopup__link
                }
              >
                Добавление рабочей смены
              </NavLink>
              <NavLink
                onClick={handleCloseModal}
                to={routes.salary}
                className={
                  location.pathname.includes(routes.salary)
                    ? `${styles.navigationPopup__link} ${styles.navigationPopup__link_type_active}`
                    : styles.navigationPopup__link
                }
              >
                Расчет зарплаты
              </NavLink>
              <NavLink
                onClick={handleCloseModal}
                to={routes.employeeSettings}
                className={
                  location.pathname.includes(routes.employeeSettings)
                    ? `${styles.navigationPopup__link} ${styles.navigationPopup__link_type_active}`
                    : styles.navigationPopup__link
                }
              >
                Параметры сотрудника
              </NavLink>
            </>
          )}

          <NavLink
            onClick={handleLogoutClick}
            to={routes.login}
            className={styles.navigationPopup__link}
          >
            Выход
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default NavigationPopup;
