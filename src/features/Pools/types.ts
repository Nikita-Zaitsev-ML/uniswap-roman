import type { RequestStatus } from 'src/shared/helpers/redux';

type State = {
  status: RequestStatus;
  data: {
    tokens: Token[];
  };
  error: string | null;
};

type Token = {
  address: string;
  name: string;
  userBalance: number;
  decimals: number;
};

type ViewType = 'edit' | 'view';

type SubmitButtonValue =
  | 'Подключите кошелек'
  | 'Выберите токены'
  | 'Добавить пару';

type Pair = { tokens: [string, string]; balance: number };

export type { State, Token, ViewType, SubmitButtonValue, Pair };
