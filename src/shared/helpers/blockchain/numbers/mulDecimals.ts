import { BigNumber } from 'ethers';

const mulDecimals = (
  a: string,
  b: string,
  decimalsA: number,
  decimalsB: number,
  additionalDecimalsToRemove = 0
) => {
  const bA = BigNumber.from(a);
  const bB = BigNumber.from(b);
  const bDecimals = `1${'0'.repeat(Math.min(decimalsA, decimalsB))}`;

  const result = bA.mul(bB).div(bDecimals).toString();

  return result.slice(0, result.length - additionalDecimalsToRemove);
};

export { mulDecimals };
