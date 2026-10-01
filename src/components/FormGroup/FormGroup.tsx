import { ReactNode, useEffect } from "react";

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
  isReset?: boolean;
};

const FormGroup = <T extends FieldValues>({
  onSubmit,
  children,
  style,
  isReset = false,
}: FormGroupProps<T>) => {
  const formMethods = useForm<T>();
  const { reset } = formMethods;

  useEffect(() => {
    if (isReset) {
      reset();
    }
  }, [isReset, reset]);

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
