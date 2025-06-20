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
