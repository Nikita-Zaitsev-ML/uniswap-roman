import * as yup from 'yup';

const schema = yup
  .object({
    theFirstItem: yup
      .string()
      .notOneOf([yup.ref('theSecondItem')], 'Элементы не должны совпадать')
      .required('Выберите элемент'),
    theFirstItemValue: yup
      .number()
      .typeError('Значение должно быть числом')
      .moreThan(0, 'Значение должно быть > 0')
      .required('Заполните поле'),
    theSecondItem: yup
      .string()
      .notOneOf([yup.ref('theFirstItem')], 'Элементы не должны совпадать')
      .required('Выберите элемент'),
    theSecondItemValue: yup
      .number()
      .typeError('Значение должно быть числом')
      .moreThan(0, 'Значение должно быть > 0')
      .required('Заполните поле'),
  })
  .required();

export { schema };
