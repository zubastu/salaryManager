import { TCountCaseItem, TWorkShift } from "../types";

export const countHelper = (data: TWorkShift[]): TCountCaseItem[] => {
  if (!data || data.length === 0) return [];

  const result: any = [];
  const newData = [...data].reverse();

  for (let i = 0; i < newData.length - 1; i++) {
    const current = newData[i];
    const next = newData[i + 1];

    result.push({
      id: current.id,
      date: `на ${new Date(next.date).toLocaleDateString()}`,
      employee: next.user.name,
      resultCashInCase:
        (current.cash_in_case ?? 0) + (next.cash ?? 0) - (next.costs ?? 0),
      factInCase: next.cash_in_case,
      isNightShift: next.isNightShift,
    });
  }

  return result;
};
