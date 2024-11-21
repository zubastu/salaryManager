import { TWorkShift } from "../types";

export const sortCallback = (a: TWorkShift, b: TWorkShift) => {
  const one = new Date(a.createdAt) as unknown as number;
  const two = new Date(b.createdAt) as unknown as number;
  return one - two;
};
