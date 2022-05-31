import { RequestStatus } from 'src/shared/helpers/redux';
import { Address } from 'src/shared/api/blockchain/types';

type State = {
  status: RequestStatus;
  calculationStatus: RequestStatus;
  data: {
    tokens: Token[];
    pairs: Pair[];
    fee: Fee;
  };
  calculation: {
    action: 'in' | 'out';
    value: string;
    fee: string;
    decimals: number;
  };
  shouldUpdateData: boolean;
  error: string | null;
};

type Token = {
  address: Address;
  name: string;
  userBalance: string;
  decimals: number;
};

type Pair = Omit<Token, 'name'> & {
  tokens: (Token & { pairBalance: string | '' })[];
  proportion: string | 'any';
};

type Fee = {
  value: string;
  decimals: number;
};

export type { State, Token, Pair, Fee };
