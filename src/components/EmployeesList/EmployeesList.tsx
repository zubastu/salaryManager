import styles from "./styles.module.scss";

const EmployeesList = () => {
  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>Доступные сотрудники</h3>
      <ul className={styles.employeeList}>
        <li className={styles.employeeItem}>Дима</li>
        <li className={styles.employeeItem}>Дима</li>
        <li className={styles.employeeItem}>Дима</li>
        <li className={styles.employeeItem}>Дима</li>
        <li className={styles.employeeItem}>Дима</li>
        <li className={styles.employeeItem}>Дима</li>
      </ul>
    </section>
  );
};

export default EmployeesList;
