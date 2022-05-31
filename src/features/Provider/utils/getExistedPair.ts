import { Token, Pair } from '../types';

type Options = {
  tokenInName: string;
  tokenOutName: string;
  tokens: Token[];
  pairs: Pair[];
};

const getExistedPair = ({
  tokenInName,
  tokenOutName,
  tokens,
  pairs,
}: Options) => {
  const tokenInData = tokens.find((token) => token.name === tokenInName);
  const tokenOutData = tokens.find((token) => token.name === tokenOutName);
  const existedPair = pairs.find(
    ({ tokens: [token0, token1] }) =>
      (token0.address === tokenInData?.address &&
        token1.address === tokenOutData?.address) ||
      (token1.address === tokenInData?.address &&
        token0.address === tokenOutData?.address)
  );

  return { tokenInData, tokenOutData, existedPair };
};

export { getExistedPair };
