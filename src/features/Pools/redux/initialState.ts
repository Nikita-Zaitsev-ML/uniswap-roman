import type { State } from '../types';

const initialState: State = {
  status: 'idle',
  error: null,
  data: {
    tokens: [],
    pairs: [],
  },
};

export { initialState };
