import styles from "./styles.module.scss";
import EmployeeListItem from "../EmployeeListItem/EmployeeListItem.tsx";
import { useGetEmployeesQuery } from "../../store/employees/employees.api.ts";

type EmployeesListProps = {
  fillAvailable?: boolean;
};

const EmployeesList = ({ fillAvailable = false }: EmployeesListProps) => {
  const { data, isSuccess } = useGetEmployeesQuery();

  return (
    <section className={`${styles.container} ${fillAvailable ? styles.fillAvailable : ""}`}>
      <h3 className={styles.heading}>Доступные сотрудники</h3>
      <ul className={styles.employeeList}>
        {isSuccess &&
          data &&
          data.map((employee) => (
            <EmployeeListItem
              name={employee.name}
              id={employee.id}
              key={employee.id}
            />
          ))}
      </ul>
    </section>
  );
};

export default EmployeesList;
