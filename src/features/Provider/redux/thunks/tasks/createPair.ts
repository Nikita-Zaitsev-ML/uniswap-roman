import { ethers } from 'ethers';

import { fetchReadFromRegistry } from 'src/shared/api/blockchain/rinkeby/fetches/readFromRegistry';
import { fetchWriteToFactory } from 'src/shared/api/blockchain/rinkeby/fetches/writeToFactory';
import { isError } from 'src/shared/types/guards';

type Options = {
  tokenInAddress: string;
  tokenOutAddress: string;
  provider: ethers.providers.Web3Provider;
  signer: ethers.Signer;
};

const createPair = async ({
  tokenInAddress,
  tokenOutAddress,
  provider,
  signer,
}: Options) => {
  const txFactory = await fetchWriteToFactory({
    contractParameters: { signer },
    methods: { createPair: [tokenInAddress, tokenOutAddress] },
  });

  if (isError(txFactory)) {
    return txFactory;
  }

  await txFactory.createPair.wait();

  const registry = await fetchReadFromRegistry({
    contractParameters: { provider },
    methods: { getPair: [tokenInAddress, tokenOutAddress] },
  });

  return registry;
};

export { createPair };
