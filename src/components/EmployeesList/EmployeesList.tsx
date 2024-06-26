import styles from "./styles.module.scss";
import EmployeeListItem from "../EmployeeListItem/EmployeeListItem.tsx";
import { useGetEmployeesQuery } from "../../store/employees/employees.api.ts";

const EmployeesList = () => {
  const { data, isSuccess } = useGetEmployeesQuery();

  return (
    <section className={styles.container}>
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
