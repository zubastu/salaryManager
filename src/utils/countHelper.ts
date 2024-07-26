import { TWorkShift } from "../types";

export const countHelper = (data: TWorkShift[]) => {
  const result: any = [];

  data.reduce((firstShift, secondShift) => {
    result.push({
      date: new Date(secondShift.date).toLocaleDateString(),
      resultCashInCase:
        firstShift.cash_in_case! + secondShift.cash - secondShift.costs!,
      factInCase: secondShift.cash_in_case,
      isNightShift: secondShift.isNightShift,
    });
    return secondShift;
  });

  return result;
};
/*
 1. Получаю список смен из которых получаю расчет
 2. Прохожу по списку смен reduce, считая нал.в кассе с текущей смены и нал.расчет - расходы с следующей смены и сравнить с фактически поданным числом со смены
 */
