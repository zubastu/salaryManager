import { TWorkShift } from "../types";

export const sortCallback = (a: TWorkShift, b: TWorkShift) => {
  const one = new Date(a.date) as unknown as number;
  const two = new Date(b.date) as unknown as number;
  return two - one;
};
