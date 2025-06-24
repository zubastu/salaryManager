import {
  TCoefficient,
  TEmployeeListItem,
  TForm,
  TWorkShiftProperties,
} from "../types";
import { nightHours, dayHours } from "./constants.ts";

export const getSalary = (
  data: TForm,
  isNightWork: boolean,
  selectedEmployee: TEmployeeListItem,
  coefficientsData: TCoefficient,
): TWorkShiftProperties => {
  const { workHours, gain } = data;
  const {
    pricePerHour,
    valueOfGainGoodDay,
    valueOfGainVeryGoodDay,
    valueOfGainGoodNight,
    valueOfGainVeryGoodNight,
    coefficientOfGainVeryGood,
    coefficientOfGainGood,
  } = coefficientsData;

  const valueOfGainGood = isNightWork
    ? valueOfGainGoodNight
    : valueOfGainGoodDay;
  const valueOfGainVeryGood = isNightWork
    ? valueOfGainVeryGoodNight
    : valueOfGainVeryGoodDay;

  const countGoodGain = gain >= valueOfGainGood ? coefficientOfGainGood : 1;
  const countVeryGoodGain =
    gain >= valueOfGainVeryGood ? coefficientOfGainVeryGood : countGoodGain;

  const salary = Math.floor(workHours * (pricePerHour * countVeryGoodGain));

  return {
    ...data,
    date: isNightWork ? data.date + nightHours : data.date + dayHours,
    salary,
    isNightShift: isNightWork,
    user_id: selectedEmployee.id,
  };
};
