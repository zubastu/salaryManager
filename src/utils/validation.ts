import { RegisterOptions } from "react-hook-form";

const minVal = (n: number) => ({
  value: n,
  message: `минимум ${n} символ(ов)`,
});

const maxVal = (n: number) => ({
  value: n,
  message: `не более ${n} символ(ов)`,
});

const enum CommonErrorMessages {
  noSpaces = "Без пробелов",
  latinLetters = "Только латинские буквы, разрешены дефисы и подчеркивания",
  atLeastOneLetter = "Минимум одна буква",
  noCharacters = "Из символов допускаются только дефисы и подчеркивания",
  firstUppercase = "Первая буква обязательно заглавная",
  noDigit = "Цифры не допустимы",
}

const noSpaces = (value: string) =>
  /^[^\s]*$/.test(value) ? true : CommonErrorMessages.noSpaces;

const latinLetters = (value: string) =>
  /^[a-zA-Z0-9_-\s]+$/.test(value) ? true : CommonErrorMessages.latinLetters;

const atLeastOneLetter = (value: string) =>
  /^.*[a-zA-Z]+.*$/.test(value) ? true : CommonErrorMessages.atLeastOneLetter;

const noCharacters = (value: string) =>
  /^[a-zA-Zа-яёА-ЯЁ0-9._,-\s]+$/.test(value)
    ? true
    : CommonErrorMessages.noCharacters;

const firstUppercase = (value: string) =>
  /^[A-ZА-ЯЁ]/.test(value) ? true : CommonErrorMessages.firstUppercase;

const noDigit = (value: string) =>
  /^[^0-9]*$/.test(value) ? true : CommonErrorMessages.noDigit;

export const validation: Record<string, RegisterOptions> = {
  username: {
    required: "Логин обязательно для заполнения",
    minLength: minVal(3),
    maxLength: maxVal(20),
    validate: {
      latinLetters,
      atLeastOneLetter,
      noSpaces,
    },
  },

  password: {
    required: "Пароль не может быть пустым",
    minLength: minVal(5),
    maxLength: maxVal(40),
    validate: {
      noSpaces,
    },
  },

  name: {
    required: "Имя не может быть пустым",
    validate: {
      noCharacters,
      firstUppercase,
      noDigit,
      noSpaces,
    },
  },

  ws: {
    required: "Поле не может быть пустым",
    minLength: minVal(1),
    maxLength: maxVal(20),
    validate: {
      noSpaces,
    },
  },
};
