import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { fetchReadFromRegistry } from 'src/shared/api/blockchain/rinkeby/fetches/readFromRegistry';
import { fetchWriteToERC20 } from 'src/shared/api/blockchain/rinkeby/fetches/writeToERC20';
import { fetchWriteToRouter } from 'src/shared/api/blockchain/rinkeby/fetches/writeToRouter';
import { contracts } from 'src/shared/api/blockchain/rinkeby/constants';
import { isError } from 'src/shared/types/guards';

type Options = {
  tokenInAddress: string;
  tokenInValue: ethers.BigNumber;
  tokenOutAddress: string;
  tokenOutMin: ethers.BigNumber;
  provider: ethers.providers.Web3Provider;
  signer: ethers.Signer;
};

const swapIn = createAsyncThunk(
  'Provider/swapIn',
  async ({
    tokenInAddress,
    tokenInValue,
    tokenOutAddress,
    tokenOutMin,
    provider,
    signer,
  }: Options): Promise<void> => {
    const registry = await fetchReadFromRegistry({
      contractParameters: { provider },
      methods: { getPair: [tokenInAddress, tokenOutAddress] },
    });

    if (isError(registry)) {
      return Promise.reject(registry);
    }

    const pairAddress = registry?.getPair;

    if (pairAddress === undefined) {
      return Promise.reject(new Error('registry.getPair result is undefined'));
    }

    const txTokenIn = await fetchWriteToERC20({
      contractParameters: { address: tokenInAddress, signer },
      methods: {
        approve: [contracts.router.address, tokenInValue],
      },
    });

    if (isError(txTokenIn)) {
      return Promise.reject(txTokenIn);
    }

    await txTokenIn.approve.wait();

    const txRouter = await fetchWriteToRouter({
      contractParameters: { signer },
      methods: {
        swapIn: [tokenInAddress, tokenOutAddress, tokenInValue, tokenOutMin],
      },
    });

    if (isError(txRouter)) {
      return Promise.reject(txRouter);
    }

    await txRouter.swapIn.wait();

    return undefined;
  }
);

export { swapIn };
