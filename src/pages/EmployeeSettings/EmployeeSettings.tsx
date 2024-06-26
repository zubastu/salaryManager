import styles from "./styles.module.scss";
import FormGroup from "../../components/FormGroup/FormGroup.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import EmployeesList from "../../components/EmployeesList/EmployeesList.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/store.ts";
import {
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeParamsMutation,
} from "../../store/employees/employees.api.ts";
import { SubmitHandler } from "react-hook-form";
import { TEmployeeForm } from "../../types";
import { useEffect, useState } from "react";
import { resetEmployee } from "../../store/employeeSelectionSlice/employeeSelectionSlice.ts";

enum Tabs {
  add = "ADD",
  update = "UPDATE",
  remove = "REMOVE",
}

const EmployeeSettings = () => {
  const [tab, setTab] = useState<Tabs>(Tabs.add);

  const dispatch = useAppDispatch();
  const { selectedEmployee } = useAppSelector(
    (store) => store.selectedEmployee,
  );
  const [deleteEmployee, { isSuccess: isSuccessDelete }] =
    useDeleteEmployeeMutation();
  const [createEmployee, { isSuccess: isSuccessCreate }] =
    useCreateEmployeeMutation();
  const [updateEmployee, { isSuccess: isSuccessUpdate }] =
    useUpdateEmployeeParamsMutation();

  const handleSubmitCreate: SubmitHandler<TEmployeeForm> = async (data) => {
    await createEmployee(data);
  };

  const handleSubmitUpdate: SubmitHandler<TEmployeeForm> = async (data) => {
    await updateEmployee({ ...data, id: selectedEmployee.id });
  };

  const handleSubmitDelete = async () => {
    await deleteEmployee(selectedEmployee.id);
  };
  useEffect(() => {
    if (isSuccessDelete) {
      dispatch(resetEmployee());
    }
    dispatch(resetEmployee());
  }, [isSuccessDelete]);

  return (
    <section className={styles.container}>
      <div className={styles.tabs}>
        <Button
          label="Добавить"
          onClick={() => setTab(Tabs.add)}
          extraStyles={tab === Tabs.add ? styles.buttonActive : ""}
        />
        <Button
          label="Изменить"
          onClick={() => setTab(Tabs.update)}
          extraStyles={tab === Tabs.update ? styles.buttonActive : ""}
        />
        <Button
          label="Удалить"
          onClick={() => setTab(Tabs.remove)}
          extraStyles={tab === Tabs.remove ? styles.buttonActive : ""}
        />
      </div>

      <div className={styles.forms}>
        <EmployeesList />
        {tab === Tabs.add && (
          <div className={styles.createFormContainer}>
            <h3 className={styles.heading}>Добавить сотрудника</h3>

            <FormGroup onSubmit={handleSubmitCreate} isReset={isSuccessCreate}>
              <Input name="name" placeholder="Имя сотрудника" />
              <Button label="Добавить" />
            </FormGroup>
          </div>
        )}

        {tab === Tabs.update && (
          <div className={styles.updateFormContainer}>
            <h3 className={styles.selectedEmployee}>Выбранный сотрудник:</h3>
            <p className={styles.selectedEmployeeName}>
              {selectedEmployee.name}
            </p>

            <FormGroup onSubmit={handleSubmitUpdate} isReset={isSuccessUpdate}>
              <Input name="name" placeholder="Имя сотрудника" />
              <Button label="Изменить" />
            </FormGroup>
          </div>
        )}
        {tab === Tabs.remove && (
          <div className={styles.deleteEmployee}>
            <h3 className={styles.selectedEmployee}>Выбранный сотрудник:</h3>
            <p className={styles.selectedEmployeeName}>
              {selectedEmployee.name}
            </p>

            <FormGroup onSubmit={handleSubmitDelete}>
              <Button label="Удалить" />
            </FormGroup>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmployeeSettings;
