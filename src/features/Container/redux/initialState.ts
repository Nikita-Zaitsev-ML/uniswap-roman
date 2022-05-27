import { State } from '../types';

const initialState: State = {
  status: 'idle',
  error: null,
  data: {
    tokens: [],
    pairs: [],
    fee: { value: '0', decimals: 0 },
  },
};

export { initialState };
