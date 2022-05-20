type SubmitButtonValue =
  | 'Подключите кошелек'
  | 'Выберите токены'
  | 'Добавить пару';

type Pair = { tokens: [string, string]; balance: number };

type ViewType = 'edit' | 'view';

export type { SubmitButtonValue, Pair, ViewType };
