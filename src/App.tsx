import styles from "./App.module.scss";
import { Navigate, Route, Routes, useLocation } from "react-router";
import WorkShifts from "./pages/WorkShifts/WorkShifts.tsx";
import { routes } from "./utils/routes.ts";
import Header from "./components/Header/Header.tsx";
import Login from "./pages/Login/Login.tsx";
import EmployeeSettings from "./pages/EmployeeSettings/EmployeeSettings.tsx";
import CountSalary from "./pages/CountSalary/CountSalary.tsx";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === routes.login;
  return (
    <>
      {!isLoginPage && <Header />}
      <main className={styles.main}>
        <Routes>
          <Route element={<WorkShifts />} path={routes.workShifts} />
          <Route element={<CountSalary />} path={routes.salary} />
          <Route
            element={<EmployeeSettings />}
            path={routes.employeeSettings}
          />
          <Route element={<Login />} path={routes.login} />
          <Route
            element={<Navigate to={routes.workShifts} replace={true} />}
            path={"*"}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
