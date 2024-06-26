import styles from "./styles.module.scss";
import { FC } from "react";
import {
  resetEmployee,
  setEmployee,
} from "../../store/employeeSelectionSlice/employeeSelectionSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import { TEmployeeListItem } from "../../types";

const EmployeeListItem: FC<TEmployeeListItem> = ({ id, name }) => {
  const dispatch = useAppDispatch();
  const { selectedEmployee } = useAppSelector(
    (store) => store.selectedEmployee,
  );

  const isSelected = id === selectedEmployee.id;

  const handleSelectEmployee = () => {
    if (isSelected) {
      dispatch(resetEmployee());
      return;
    }
    dispatch(setEmployee({ id, name }));
  };

  return (
    <li
      className={isSelected ? styles.employeeItemSelected : styles.employeeItem}
      onClick={handleSelectEmployee}
    >
      {name}
    </li>
  );
};

export default EmployeeListItem;
