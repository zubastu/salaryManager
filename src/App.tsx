import styles from "./App.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type TForm = {
  employeeName: string;
  gain: number;
  workHours: number;
  salary: number;
  isNightShift: boolean;
};

function App() {
  const [workShifts, setWorkShifts] = useState<TForm[]>([]);
  const { register, handleSubmit, reset } = useForm<TForm>();
  const [isNightWork, setIsNightWork] = useState(false);

  const getSalary = (data: TForm) => {
    const { workHours, gain } = data;
    const pricePerHour = 200;
    const valueOfGainGood = isNightWork ? 7000 : 10000;
    const valueOfGainVeryGood = isNightWork ? 12000 : 16000;

    const coefficientOfGainGood = gain >= valueOfGainGood ? 1.1 : 1;
    const coefficientOfGainVeryGood =
      gain >= valueOfGainVeryGood ? 1.2 : coefficientOfGainGood;

    const salary = Math.floor(
      workHours * (pricePerHour * coefficientOfGainVeryGood),
    );

    return { ...data, salary, isNightShift: isNightWork };
  };

  const handleChange = () => {
    setIsNightWork((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<TForm> = (data) => {
    setWorkShifts([...workShifts, getSalary(data)]);
    reset();
  };

  const getEmployeeNames = () => {
    const result: string[] = [];

    workShifts.forEach(({ employeeName }) => {
      if (result.find((item) => item === employeeName)) {
        return;
      }
      result.push(employeeName);
    });

    return result;
  };

  const filterByName = (name: string) => {
    return workShifts.filter((item) => item.employeeName === name);
  };

  const getCountOfSalaryByEmployeeNames = () => {
    const names = getEmployeeNames();

    const groups = names.map((name) => {
      return { name, workShifts: filterByName(name) };
    });

    return groups.map((employee) => {
      const name = employee.name;
      const totalWorkHours = employee.workShifts.reduce((acc, shift) => {
        return acc + Number(shift.workHours);
      }, 0);

      const totalSalary = employee.workShifts.reduce((acc, shift) => {
        return acc + shift.salary;
      }, 0);

      return { name, totalWorkHours, totalSalary };
    });
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            {...register("employeeName")}
            type="text"
            placeholder="Имя сотрудника"
          />
          <input
            className={styles.input}
            {...register("gain")}
            type="number"
            placeholder="Количество выручки"
          />
          <input
            className={styles.input}
            {...register("workHours")}
            type="number"
            placeholder="Часы"
          />
        </div>

        <div className={styles.buttonsContainer}>
          <button type="button" onClick={handleChange}>
            {isNightWork ? "Ночная" : "Дневная"}
          </button>
          <button type="submit">Добавить</button>
        </div>
      </form>

      <div className={styles.employeeContainer}>
        {getCountOfSalaryByEmployeeNames()?.map((item) => (
          <div className={styles.employeeItem} key={item.name}>
            <p>Сотрудник: {item.name}</p>
            <p>Часы: {item.totalWorkHours}</p>
            <p>Заработал: {item.totalSalary}</p>
          </div>
        ))}
      </div>

      <div className={styles.totalList}>
        {workShifts?.map((item) => (
          <div>
            <p>Сотрудник: {item.employeeName}</p>
            <p>Часы: {item.workHours}</p>
            <p className={styles.lastP}>Заработал: {item.salary}</p>
            <p className={styles.lastP}>Прибыль: {item.gain}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
