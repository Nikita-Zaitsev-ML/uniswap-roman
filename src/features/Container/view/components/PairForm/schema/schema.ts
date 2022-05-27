import * as yup from 'yup';

const schema = yup
  .object({
    theFirstItem: yup
      .string()
      .notOneOf([yup.ref('theSecondItem')], 'Элементы не должны совпадать')
      .required('Выберите элемент'),
    theFirstItemValue: yup.string().required('Заполните поле'),
    theSecondItem: yup
      .string()
      .notOneOf([yup.ref('theFirstItem')], 'Элементы не должны совпадать')
      .required('Выберите элемент'),
    theSecondItemValue: yup.string().required('Заполните поле'),
  })
  .required();

export { schema };
