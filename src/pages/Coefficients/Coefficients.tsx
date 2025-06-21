import styles from "./styles.module.scss";
import { useGetCoefficientsQuery } from "../../store/coefficients/coeficients.api.ts";
import Button from "../../components/Button/Button.tsx";
import { openUpdateCoefficientsModal } from "../../store/updateCoefficientsModalSlice/updateCoefficientsModalSlice.ts";
import { useAppDispatch } from "../../hooks/store.ts";

const Coefficients = () => {
  const { data: coefficientsData } = useGetCoefficientsQuery();

  const dispatch = useAppDispatch();

  const openCoefficientsModal = () => {
    dispatch(openUpdateCoefficientsModal());
  };

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.li}>
          Стоимость часа работы: {coefficientsData?.pricePerHour}р.
        </li>

        <li className={styles.li}>
          Знач. хорошей выручки(день): {coefficientsData?.valueOfGainGoodDay}
          р.
        </li>

        <li className={styles.li}>
          Знач. оч.хорошей выручки(день):{" "}
          {coefficientsData?.valueOfGainVeryGoodDay}р.
        </li>

        <li className={styles.li}>
          Знач. хорошей выручки(ночь): {coefficientsData?.valueOfGainGoodNight}
          р.
        </li>

        <li className={styles.li}>
          Знач. оч. хорошей выручки(ночь):{" "}
          {coefficientsData?.valueOfGainVeryGoodNight}р.
        </li>

        <li className={styles.li}>
          Коэфф. за хорошую выручку: {coefficientsData?.coefficientOfGainGood}
        </li>

        <li className={styles.li}>
          Коэфф. за оч. хорошую выручку:{" "}
          {coefficientsData?.coefficientOfGainVeryGood}
        </li>
      </ul>

      <Button
        type="button"
        onClick={openCoefficientsModal}
        label={"Изменить коэфф."}
      />
    </section>
  );
};

export default Coefficients;
