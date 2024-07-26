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
import { Tab } from "../../components/Tab/Tab.tsx";
import { showNotify } from "../../store/notifyService/notifyServiceSlice.ts";

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
  const [
    deleteEmployee,
    { isSuccess: isSuccessDelete, isError: isErrorDelete },
  ] = useDeleteEmployeeMutation();
  const [
    createEmployee,
    { isSuccess: isSuccessCreate, isError: isErrorCreate },
  ] = useCreateEmployeeMutation();
  const [
    updateEmployee,
    { isSuccess: isSuccessUpdate, isError: isErrorUpdate },
  ] = useUpdateEmployeeParamsMutation();

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
    dispatch(resetEmployee());
  }, [tab]);

  useEffect(() => {
    if (isSuccessUpdate) {
      dispatch(resetEmployee());
      dispatch(showNotify("Сотрудник успешно обновлен"));
    }
  }, [isSuccessUpdate]);

  useEffect(() => {
    if (isErrorUpdate) {
      dispatch(showNotify("Ошибка обновления сотрудника"));
    }
  }, [isErrorUpdate]);

  useEffect(() => {
    if (isSuccessDelete) {
      dispatch(resetEmployee());
      dispatch(showNotify("Сотрудник успешно удален"));
    }
  }, [isSuccessDelete]);

  useEffect(() => {
    if (isErrorDelete) {
      dispatch(showNotify("Ошибка удаления сотрудника"));
    }
  }, [isErrorDelete]);

  useEffect(() => {
    if (isSuccessCreate) {
      dispatch(showNotify("Сотрудник успешно добавлен"));
    }
  }, [isSuccessCreate]);

  useEffect(() => {
    if (isErrorCreate) {
      dispatch(showNotify("Ошибка добавления сотрудника"));
    }
  }, [isErrorCreate]);

  return (
    <section className={styles.container}>
      <div className={styles.tabs}>
        <Tab
          value="Добавить"
          onClick={() => setTab(Tabs.add)}
          active={tab === Tabs.add}
        />
        <Tab
          value="Изменить"
          onClick={() => setTab(Tabs.update)}
          active={tab === Tabs.update}
        />
        <Tab
          value="Удалить"
          onClick={() => setTab(Tabs.remove)}
          active={tab === Tabs.remove}
        />
      </div>

      <div className={styles.forms}>
        <EmployeesList />
        {tab === Tabs.add && (
          <div className={styles.createFormContainer}>
            <h3 className={styles.heading}>Добавить сотрудника</h3>

            <FormGroup onSubmit={handleSubmitCreate} isReset={isSuccessCreate}>
              <Input name="username" placeholder="Логин сотрудника" />
              <Input name="name" placeholder="Имя сотрудника" />
              <Input name="password" placeholder="Пароль сотрудника" />
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
