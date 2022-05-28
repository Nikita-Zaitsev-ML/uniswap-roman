import { ethers } from 'ethers';

import { fetchReadFromFee } from 'src/shared/api/blockchain/rinkeby/fetches/readFromFee';
import { formatUnits } from 'src/shared/helpers/blockchain/numbers';
import { isError } from 'src/shared/types/guards';

import { Fee } from '../../../types';

type Options = {
  provider: ethers.providers.Web3Provider;
};

const getFee = async ({ provider }: Options): Promise<Partial<Fee> | Error> => {
  const fee = await fetchReadFromFee({
    contractParameters: { provider },
    methods: { swapFee: [], feeDecimals: [] },
  });

  if (isError(fee)) {
    return fee;
  }

  const { swapFee, feeDecimals: decimals } = fee;

  return {
    value: swapFee && formatUnits(swapFee, decimals),
    decimals: decimals?.toNumber(),
  };
};

export { getFee };
