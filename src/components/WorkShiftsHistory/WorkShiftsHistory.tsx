import styles from "./styles.module.scss";

const WorkShiftsHistory = () => {
  return (
    <section className={styles.container}>
      <h4 className={styles.heading}>История рабочих смен</h4>
      <ul className={styles.list}></ul>
    </section>
  );
};

export default WorkShiftsHistory;
