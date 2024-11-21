import styles from "./styles.module.scss";
import FormGroup from "../../components/FormGroup/FormGroup.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import { SubmitHandler } from "react-hook-form";
import { TLogin } from "../../types";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes.ts";
import {
  useGetUserDataQuery,
  useLoginMutation,
} from "../../store/auth/auth.api.ts";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/store.ts";
import { showNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";
import { validation } from "../../utils/validation.ts";

const Login = () => {
  const navigate = useNavigate();
  const [
    login,
    { isError: loginError, isSuccess: loginSuccess, data: loginData },
  ] = useLoginMutation();
  const { data: _, refetch } = useGetUserDataQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginData && loginData.accessToken) {
      localStorage.setItem("token", loginData.accessToken);
      dispatch(showNotify("Успешный вход!"));
    }
    if (loginError) {
      dispatch(showNotify("Ошибка входа"));
    }
  }, [loginError, loginSuccess, loginData]);

  useEffect(() => {
    if (loginData && loginData.accessToken) {
      refetch();
      navigate(routes.workShifts);
    }
  }, [loginSuccess]);

  const handleSubmit: SubmitHandler<TLogin> = (data) => {
    login(data);
  };

  const handleAdminSignin = () => {
    login({username: 'administrator', password: "salary3452"})
  }

  return (
    <section className={styles.container}>
      <FormGroup onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="Имя пользовтеля"
          type="text"
          validation={validation.username}
        />
        <Input
          name="password"
          placeholder="Пароль"
          type="password"
          validation={validation.password}
        />
        <Button label="Войти" />
      </FormGroup>

      <p className={styles.protfolio}>Версия для портфолио</p>
      <Button type="button" label="Войти как Администратор" onClick={handleAdminSignin} />

    </section>
  );
};

export default Login;
