export type TWorkShiftProperties = {
  employee_id: string;
  cash: number;
  gain: number;
  workHours: number;
  employeeName: string;
  salary: number;
  isNightShift: boolean;
  date: string;
};

export type TForm = {
  cash: number;
  gain: number;
  workHours: number;
};

export type TLogin = {
  username: string;
  password: string;
};
