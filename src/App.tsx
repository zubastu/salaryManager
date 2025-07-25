import styles from "./App.module.scss";
import { Navigate, Route, Routes, useLocation } from "react-router";
import WorkShifts from "./pages/WorkShifts/WorkShifts.tsx";
import { routes } from "./utils/routes.ts";
import Header from "./components/Header/Header.tsx";
import Login from "./pages/Login/Login.tsx";
import EmployeeSettings from "./pages/EmployeeSettings/EmployeeSettings.tsx";
import CountSalary from "./pages/CountSalary/CountSalary.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import NavigationModal from "./components/NavigationModal/NavigationModal.tsx";
import CountCase from "./pages/CountCase/CountCase.tsx";
import NotifyService from "./components/NotifyService/NotifyService.tsx";
import ConfirmDeleteEmployeeModal from "./components/ConfirmDeleteEmployeeModal/ConfirmDeleteEmployeeModal.tsx";
import ConfirmDeleteWorkShiftModal from "./components/ConfirmDeleteWorkShiftModal/ConfirmDeleteWorkShiftModal.tsx";
import UpdateWorkShiftModal from "./components/UpdateWorkShiftModal/UpdateWorkShiftModal.tsx";
import Coefficients from "./pages/Coefficients/Coefficients.tsx";
import UpdateCoefficientsModal from "./components/UpdateCoefficientsModal/UpdateCoefficientsModal.tsx";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === routes.login;

  return (
    <>
      {!isLoginPage && <Header />}
      <main className={styles.main}>
        <Routes>
          <Route
            element={
              <ProtectedRoute element={<WorkShifts />} adminOnly={false} />
            }
            path={routes.workShifts}
          />
          <Route
            element={
              <ProtectedRoute element={<CountSalary />} adminOnly={true} />
            }
            path={routes.salary}
          />
          <Route
            element={
              <ProtectedRoute element={<EmployeeSettings />} adminOnly={true} />
            }
            path={routes.employeeSettings}
          />
          <Route
            element={
              <ProtectedRoute element={<CountCase />} adminOnly={true} />
            }
            path={routes.countCase}
          />
          <Route
            element={
              <ProtectedRoute element={<CountSalary />} adminOnly={true} />
            }
            path={routes.countCase}
          />
          <Route
            element={
              <ProtectedRoute element={<Coefficients />} adminOnly={true} />
            }
            path={routes.coefficients}
          />
          <Route element={<Login />} path={routes.login} />
          <Route
            element={<Navigate to={routes.workShifts} replace={true} />}
            path={"*"}
          />
        </Routes>
        <NavigationModal />
        <NotifyService />
        <ConfirmDeleteEmployeeModal />
        <ConfirmDeleteWorkShiftModal />
        <UpdateWorkShiftModal />
        <UpdateCoefficientsModal />
      </main>
    </>
  );
}

export default App;
