import styles from "./App.module.scss";
import { Navigate, Route, Routes } from "react-router";
import WorkShifts from "./pages/WorkShifts/WorkShifts.tsx";
import { routes } from "./utils/routes.ts";
import Header from "./components/Header/Header.tsx";

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route element={<WorkShifts />} path={routes.workShifts} />
          <Route element={<p>Расчет зарплаты</p>} path={routes.salary} />
          <Route
            element={<p>Параметры сотрудников</p>}
            path={routes.employeeSettings}
          />
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
