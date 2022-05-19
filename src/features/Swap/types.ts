type Token = { name: string };

type FormState = {
  theFirstToken: string;
  theFirstTokenValue: number | '';
  theSecondToken: string;
  theSecondTokenValue: number | '';
};

type SubmitButtonValue = 'Подключите кошелек' | 'Выберите токены' | 'Обменять';

export type { Token, FormState, SubmitButtonValue };
