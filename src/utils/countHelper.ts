import { TCountCaseItem, TWorkShift } from "../types";

export const countHelper = (data: TWorkShift[]): TCountCaseItem[] => {
  const result: any = [];

  data.reduce((firstShift, secondShift) => {
    result.push({
      id: secondShift.id,
      date: new Date(secondShift.date).toLocaleDateString(),
      employee: secondShift.user.name,
      resultCashInCase:
        firstShift.cash_in_case! + secondShift.cash - secondShift.costs!,
      factInCase: secondShift.cash_in_case,
      isNightShift: secondShift.isNightShift,
    });
    return secondShift;
  });

  return result;
};
