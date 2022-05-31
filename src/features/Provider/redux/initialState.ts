import { State } from '../types';

const initialState: State = {
  status: 'idle',
  calculationStatus: 'idle',
  data: {
    tokens: [],
    pairs: [],
    fee: { value: '0', decimals: 0 },
  },
  calculation: { action: 'in', value: '0', fee: '0', decimals: 0 },
  shouldUpdateData: true,
  error: null,
};

export { initialState };
