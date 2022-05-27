import { ethers } from 'ethers';

import { fetchReadFromFee } from 'src/shared/api/blockchain/rinkeby/fetches/readFromFee';

import { Fee } from '../../../types';

type Options = {
  provider: ethers.providers.Web3Provider;
};

const getFee = async ({ provider }: Options): Promise<Partial<Fee> | Error> => {
  const fee = await fetchReadFromFee({
    contractParameters: { provider },
    methods: { swapFee: [], feeDecimals: [] },
  });

  if (fee instanceof globalThis.Error) {
    return fee;
  }

  const { swapFee, feeDecimals: decimals } = fee;

  return { value: swapFee?.toString(), decimals: decimals?.toNumber() };
};

export { getFee };
