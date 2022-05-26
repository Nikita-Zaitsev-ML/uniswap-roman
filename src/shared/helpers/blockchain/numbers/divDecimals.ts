import { BigNumber } from 'ethers';

const divDecimals = (
  a: string,
  b: string,
  decimalsA: number,
  decimalsB: number
) => {
  const bA = BigNumber.from(a);
  const bB = BigNumber.from(b);

  const bDecimals = `1${'0'.repeat(Math.max(decimalsA, decimalsB))}`;
  const int = bA.mul(bDecimals).div(bB);
  const remainder = bA.mul(bDecimals).mod(bB).div(bDecimals);

  return int.add(remainder).toString();
};

export { divDecimals };
