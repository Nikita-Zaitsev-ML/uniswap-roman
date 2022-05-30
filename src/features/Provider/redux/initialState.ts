import { State } from '../types';

const initialState: State = {
  status: 'idle',
  data: {
    tokens: [],
    pairs: [],
    fee: { value: '0', decimals: 0, amount: '0' },
  },
  shouldUpdateData: true,
  error: null,
};

export { initialState };
