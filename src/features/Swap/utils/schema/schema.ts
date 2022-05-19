import * as yup from 'yup';

const schema = yup
  .object({
    theFirstToken: yup
      .string()
      .notOneOf([yup.ref('theSecondToken')], 'Токены не должны совпадать')
      .required('Выберите токен'),
    theFirstTokenValue: yup
      .number()
      .typeError('Значение должно быть числом')
      .moreThan(0, 'Значение должно быть > 0')
      .required('Заполните поле'),
    theSecondToken: yup
      .string()
      .notOneOf([yup.ref('theFirstToken')], 'Токены не должны совпадать')
      .required('Выберите токен'),
    theSecondTokenValue: yup
      .number()
      .typeError('Значение должно быть числом')
      .moreThan(0, 'Значение должно быть > 0')
      .required('Заполните поле'),
  })
  .required();

export { schema };
