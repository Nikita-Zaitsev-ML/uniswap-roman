import { ethers } from 'ethers';

import { BigNumber } from './BigNumber';

const parseUnits = (number: string, decimals = 18) => {
  return ethers.utils.parseUnits(
    new BigNumber(number).toFixed(decimals).toString(),
    decimals
  );
};

export { parseUnits };
