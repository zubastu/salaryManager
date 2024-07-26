import styles from "./styles.module.scss";
import { useState } from "react";

import WorkShiftsHistory from "../../components/WorkShiftsHistory/WorkShiftsHistory.tsx";
import EmployeesList from "../../components/EmployeesList/EmployeesList.tsx";

import { useGetAllWorkShiftsQuery } from "../../store/workShifts/workShifts.api.ts";

import { useGetUserDataQuery } from "../../store/auth/auth.api.ts";
import { sortCallback } from "../../utils/sortHelper.ts";
import { Tab } from "../../components/Tab/Tab.tsx";
import useWindowDimensions from "../../hooks/resize.ts";
import WorkShiftsForm from "../../components/WorkShiftsForm/WorkShiftsForm.tsx";

const WorkShifts = () => {
  const [tabValue, setTabValue] = useState<"workShifts" | "history">(
    "workShifts",
  );
  const { width } = useWindowDimensions();

  const { data } = useGetAllWorkShiftsQuery();
  const { data: user } = useGetUserDataQuery();

  const newData = data && [...data].sort((a, b) => sortCallback(a, b));

  const isMobile = width <= 1180;

  return (
    <section className={styles.container}>
      <div className={styles.formWrapper}>
        {isMobile && (
          <div className={styles.tabs}>
            <Tab
              onClick={() => {
                setTabValue("workShifts");
              }}
              value="Подать смену"
              active={tabValue === "workShifts"}
            />
            <Tab
              onClick={() => {
                setTabValue("history");
              }}
              value="История"
              active={tabValue === "history"}
            />
          </div>
        )}
        {user?.role_id === 1 && !isMobile && <EmployeesList />}
        {user?.role_id === 1 && isMobile && tabValue === "workShifts" && (
          <EmployeesList />
        )}

        {!isMobile && <WorkShiftsForm />}

        {isMobile && tabValue === "workShifts" && <WorkShiftsForm />}

        {data && newData && isMobile && tabValue === "history" && (
          <WorkShiftsHistory data={newData} title="История рабочих смен" />
        )}
      </div>
      {data && newData && !isMobile && (
        <WorkShiftsHistory data={newData} title="История рабочих смен" />
      )}
    </section>
  );
};

export default WorkShifts;
