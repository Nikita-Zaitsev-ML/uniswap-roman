import { Address } from 'src/shared/api/blockchain/types';
import type { RequestStatus } from 'src/shared/helpers/redux';

type State = {
  status: RequestStatus;
  data: {
    tokens: Token[];
    pairs: Pair[];
  };
  error: string | null;
};

type Token = {
  address: Address;
  name: string;
  userBalance: string;
  decimals: number;
};

type ViewType = 'add' | 'remove';

type SubmitButtonValue =
  | 'Подключите кошелек'
  | 'Выберите токены'
  | 'Добавить пару';

type Pair = Omit<Token, 'name'> & {
  tokens: Token[];
  proportion: string | 'any';
};

export type { State, Token, ViewType, SubmitButtonValue, Pair };
