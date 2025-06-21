import styles from "./styles.module.scss";
import Input from "../Input/Input.tsx";
import { validation } from "../../utils/validation.ts";
import Button from "../Button/Button.tsx";
import FormGroup from "../FormGroup/FormGroup.tsx";
import { SubmitHandler } from "react-hook-form";
import { TCoefficient } from "../../types";
import { showNotify } from "../../store/notifyServiceSlice/notifyServiceSlice.ts";
import { useAppDispatch } from "../../hooks/store.ts";
import { useEffect } from "react";
import {
  useGetCoefficientsQuery,
  useUpdateCoefficientsMutation,
} from "../../store/coefficients/coeficients.api.ts";
import { closeUpdateCoefficientsModal } from "../../store/updateCoefficientsModalSlice/updateCoefficientsModalSlice.ts";

const UpdateCoefficientsForm = () => {
  const { data: coefficientsData } = useGetCoefficientsQuery();
  const [postCoefficients, { isSuccess, isError }] =
    useUpdateCoefficientsMutation();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TCoefficient & { confirm: string }> = async (
    data,
  ) => {
    if (data.confirm.toLowerCase() !== "обновить") {
      dispatch(showNotify("Нужно ввести 'обновить'"));
      return;
    }
    if (coefficientsData && coefficientsData.pricePerHour) {
      data.id = coefficientsData.id;
      data.coefficientOfGainGood = parseFloat(
        String(data.coefficientOfGainGood),
      );
      data.coefficientOfGainVeryGood = parseFloat(
        String(data.coefficientOfGainVeryGood),
      );

      await postCoefficients(data);
    }
  };

  const handleClose = () => {
    dispatch(closeUpdateCoefficientsModal());
  };

  useEffect(() => {
    if (isError) {
      dispatch(showNotify("Ошибка, все поля обязательны."));
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(showNotify("Коэфф. успешно обновлены."));
      handleClose();
    }
  }, [isSuccess]);

  return (
    <FormGroup onSubmit={onSubmit} style={styles.form}>
      <div className={styles.inputContainer}>
        <label className={styles.label}>
          Стоимость часа работы:
          <Input
            name="pricePerHour"
            type="number"
            validation={validation.ws}
            defaultValue={coefficientsData?.pricePerHour}
          />
        </label>
        <label className={styles.label}>
          Значение хорошей выручки(день):
          <Input
            name="valueOfGainGoodDay"
            type="number"
            validation={validation.ws}
            defaultValue={coefficientsData?.valueOfGainGoodDay}
          />
        </label>
        <label className={styles.label}>
          Значение оч. хорошей выручки(день):
          <Input
            name="valueOfGainVeryGoodDay"
            type="number"
            validation={validation.ws}
            defaultValue={coefficientsData?.valueOfGainVeryGoodDay}
          />
        </label>
        <label className={styles.label}>
          Значение хорошей выручки(ночь):
          <Input
            name="valueOfGainGoodNight"
            type="number"
            validation={validation.ws}
            defaultValue={coefficientsData?.valueOfGainGoodNight}
          />
        </label>
        <label className={styles.label}>
          Значение оч. хорошей выручки(ночь):
          <Input
            name="valueOfGainVeryGoodNight"
            type="number"
            validation={validation.ws}
            defaultValue={coefficientsData?.valueOfGainVeryGoodNight}
          />
        </label>

        <label className={styles.label}>
          Коэфф. за хорошую выручку:
          <Input
            name="coefficientOfGainGood"
            type="number"
            step="0.1"
            min={1.0}
            validation={validation.ws}
            defaultValue={coefficientsData?.coefficientOfGainGood}
          />
        </label>
        <label className={styles.label}>
          Коэфф. за оч. хорошую выручку:
          <Input
            name="coefficientOfGainVeryGood"
            type="number"
            step="0.1"
            min={1.0}
            validation={validation.ws}
            defaultValue={coefficientsData?.coefficientOfGainVeryGood}
          />
        </label>
        <label className={styles.label}>
          Подтверждение:
          <Input name="confirm" placeholder="Введите обновить" />
        </label>
      </div>
      <div className={styles.buttonsContainer}>
        <Button type="submit" label="Обновить коэфф." />

        <Button
          type="button"
          onClick={handleClose}
          label={"Отмена"}
          extraStyles={styles.cancel}
        />
      </div>
    </FormGroup>
  );
};

export default UpdateCoefficientsForm;

/*{
  pricePerHour: 220;
  valueOfGainGoodDay: 100000;
  valueOfGainVeryGoodDay: 15000;
  valueOfGainGoodNight: 70000;
  valueOfGainVeryGoodNight: 12000;
  coefficientOfGainGood: 1.1;
  coefficientOfGainVeryGood: 1.2;
  id: 0;
}*/
