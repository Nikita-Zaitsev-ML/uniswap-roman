import { Pair } from '../types';

const isPairFull = (pair: Partial<Pair>): pair is Pair => {
  const isFull =
    pair.address !== undefined &&
    pair.userBalance !== undefined &&
    pair.decimals !== undefined &&
    pair.proportion !== undefined;

  return isFull;
};

export { isPairFull };
