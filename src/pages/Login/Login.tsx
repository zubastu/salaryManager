import styles from "./styles.module.scss";
import FormGroup from "../../components/FormGroup/FormGroup.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import { SubmitHandler } from "react-hook-form";
import { TLogin } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes.ts";
import { useLoginMutation } from "../../store/auth/auth.api.ts";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isError, isSuccess, data }] = useLoginMutation();

  useEffect(() => {
    if (data && data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      navigate(routes.workShifts);
    }
  }, [isError, isSuccess, data]);

  const handleSubmit: SubmitHandler<TLogin> = (data) => {
    login(data);
  };

  return (
    <section className={styles.container}>
      <FormGroup onSubmit={handleSubmit}>
        <Input name="username" placeholder="Имя пользовтеля" type="text" />
        <Input name="password" placeholder="Пароль" type="password" />
        <Button label="Войти" />
        <Link className={styles.link} to={routes.workShifts}>
          Назад к сменам
        </Link>
      </FormGroup>
    </section>
  );
};

export default Login;
