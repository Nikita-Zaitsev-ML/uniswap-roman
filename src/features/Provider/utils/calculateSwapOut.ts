import { ethers } from 'ethers';

import { BigNumber, formatUnits } from 'src/shared/helpers/blockchain/numbers';

type Options = {
  amountOut: ethers.BigNumber;
  balanceIn: ethers.BigNumber;
  balanceOut: ethers.BigNumber;
  fee: {
    amount: ethers.BigNumber;
    decimals: number;
  };
  decimals: number;
};

const calculateSwapOut = ({
  amountOut,
  balanceIn,
  balanceOut,
  fee,
  decimals,
}: Options) => {
  const tenBigNumber = new BigNumber(10);
  const amountOutBigNumber = new BigNumber(amountOut.toString());
  const balanceInBigNumber = new BigNumber(balanceIn.toString());
  const balanceOutBigNumber = new BigNumber(balanceOut.toString());

  const multiplier = tenBigNumber.pow(fee.decimals);
  const amountIn = balanceInBigNumber
    .times(amountOutBigNumber)
    .times(multiplier)
    .div(
      balanceOutBigNumber
        .minus(amountOutBigNumber)
        .times(multiplier.minus(fee.amount.toString()))
    )
    .toFixed(0);

  return formatUnits(amountIn.toString(), decimals);
};

export { calculateSwapOut };
