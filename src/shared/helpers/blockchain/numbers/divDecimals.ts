import { BigNumber } from 'ethers';

// Tip: result have decimals precision more
const divDecimals = (
  a: string,
  b: string,
  decimalsA: number,
  decimalsB: number,
  additionalDecimals: number = 0
) => {
  const decimalDifference = '0'.repeat(Math.abs(decimalsA - decimalsB));
  const additionalDigits = '0'.repeat(additionalDecimals);

  const bA =
    decimalsA >= decimalsB
      ? BigNumber.from(`${a}${additionalDigits}`)
      : BigNumber.from(`${a}${decimalDifference}${additionalDigits}`);
  const bB =
    decimalsA >= decimalsB
      ? BigNumber.from(`${b}${decimalDifference}${additionalDigits}`)
      : BigNumber.from(`${b}${additionalDigits}`);

  const bDecimals = `1${'0'.repeat(
    Math.max(decimalsA, decimalsB)
  )}${additionalDigits}`;
  const int = bA.mul(bDecimals).div(bB);
  const remainder = bA.mul(bDecimals).mod(bB).div(bDecimals);

  return int.add(remainder).toString();
};

export { divDecimals };
