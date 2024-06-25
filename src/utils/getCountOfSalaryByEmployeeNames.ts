import { TWorkShiftProperties } from "../types";

export const getCountOfSalaryByEmployeeNames = (
  workShifts: TWorkShiftProperties[],
) => {
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
