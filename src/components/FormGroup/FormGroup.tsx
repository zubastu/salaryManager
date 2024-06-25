import { ReactNode } from "react";

import {
  FormProvider,
  SubmitHandler,
  useForm,
  FieldValues,
} from "react-hook-form";

import styles from "./styles.module.scss";

export type FormGroupProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  style?: string;
};

const FormGroup = <T extends Record<any, any>>({
  onSubmit,
  children,
  style,
}: FormGroupProps<T>) => {
  const formMethods = useForm<T>();
  return (
    <FormProvider {...formMethods}>
      <form
        noValidate={true}
        className={style ? style : styles.form}
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormGroup;
