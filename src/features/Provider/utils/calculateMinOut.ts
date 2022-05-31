import {
  BigNumber,
  formatUnits,
  parseUnits,
} from 'src/shared/helpers/blockchain/numbers';

type Options = {
  amountOut: string;
  slippage: number;
  decimals: number;
};

const calculateMinOut = ({ amountOut, slippage, decimals }: Options) => {
  const tokenOutValueBigNumber = new BigNumber(
    parseUnits(amountOut, decimals).toString()
  );
  const slippageBigNumber = tokenOutValueBigNumber.times(slippage).div(100);

  const tokenMinOut = tokenOutValueBigNumber
    .minus(slippageBigNumber)
    .toFixed(0);

  return formatUnits(tokenMinOut, decimals);
};

export { calculateMinOut };
