import { Token } from '../types';

const isTokenFull = (token: Partial<Token>): token is Token => {
  const isFull =
    token.address !== undefined &&
    token.name !== undefined &&
    token.userBalance !== undefined &&
    token.decimals !== undefined;

  return isFull;
};

export { isTokenFull };
