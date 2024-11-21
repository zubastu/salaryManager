export type TWorkShiftProperties = {
  user_id: string;
  cash: number;
  cash_in_case?: number;
  costs?: number;
  gain: number;
  workHours: number;
  salary: number;
  isNightShift: boolean;
  date: string;
};

export type TForm = {
  cash: number;
  gain: number;
  workHours: number;
  date: string;
};

export type TLogin = {
  username: string;
  password: string;
};

export type TEmployee = {
  id: string;
  name: string;
  workShifts: TWorkShiftProperties[];
};

export type TEmployeeListItem = {
  name: string;
  id: string;
};

export type TWorkShift = {
  id: string;
  date: string;
  gain: number;
  workHours: number;
  salary: number;
  cash: number;
  costs?: number;
  cash_in_case?: number;
  isNightShift: boolean;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};
export type User = {
  id: string;
  username: string;
  name: string;
  role_id: number;
};

export type TEmployeeForm = {
  name: string;
};

export type TEmployeeFormWithId = TEmployeeForm & {
  id: string;
};

export type TCountCaseItem = {
  id: string;
  employee: string;
  date: string;
  resultCashInCase: number;
  factInCase: number;
  isNightShift: boolean;
};
