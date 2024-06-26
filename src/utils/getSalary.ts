import { TEmployeeListItem, TForm, TWorkShiftProperties } from "../types";

export const getSalary = (
  data: TForm,
  isNightWork: boolean,
  selectedEmployee: TEmployeeListItem,
): TWorkShiftProperties => {
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

  return {
    ...data,
    salary,
    isNightShift: isNightWork,
    employeeName: selectedEmployee.name,
    employee_id: selectedEmployee.id,
  };
};
