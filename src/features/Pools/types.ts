import type { RequestStatus } from 'src/shared/helpers/redux';

type State = {
  status: RequestStatus;
  data: {
    tokens: {
      address: string;
      name: string;
      userBalance: number;
      decimals: number;
    }[];
  };
  error: string | null;
};

type ViewType = 'edit' | 'view';

type SubmitButtonValue =
  | 'Подключите кошелек'
  | 'Выберите токены'
  | 'Добавить пару';

type Pair = { tokens: [string, string]; balance: number };

export type { State, ViewType, SubmitButtonValue, Pair };
