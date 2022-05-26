import { BigNumber } from 'ethers';

const mulDecimals = (
  a: string,
  b: string,
  decimalsA: number,
  decimalsB: number
) => {
  const bA = BigNumber.from(a);
  const bB = BigNumber.from(b);
  const bDecimals = `1${'0'.repeat(Math.min(decimalsA, decimalsB))}`;

  return bA.mul(bB).div(bDecimals).toString();
};

export { mulDecimals };
