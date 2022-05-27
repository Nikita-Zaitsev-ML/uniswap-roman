import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { fetchReadFromRegistry } from 'src/shared/api/blockchain/rinkeby/fetches/readFromRegistry';
import { fetchWriteToERC20 } from 'src/shared/api/blockchain/rinkeby/fetches/writeToERC20';
import { fetchWriteToRouter } from 'src/shared/api/blockchain/rinkeby/fetches/writeToRouter';

type Options = {
  tokenInAddress: string;
  tokenInValue: string;
  tokenOutAddress: string;
  tokenOutMin: string;
  provider: ethers.providers.Web3Provider;
  signer: ethers.Signer;
};

const swapIn = createAsyncThunk(
  'Container/swapIn',
  async ({
    tokenInAddress,
    tokenInValue,
    tokenOutAddress,
    tokenOutMin,
    provider,
    signer,
  }: Options): Promise<void> => {
    const registryInfo = await fetchReadFromRegistry({
      contractParameters: { provider },
      methods: { getPair: [tokenInAddress, tokenOutAddress] },
    });

    if (registryInfo instanceof globalThis.Error) {
      return Promise.reject(registryInfo);
    }

    if (registryInfo?.getPair === undefined) {
      return Promise.reject(
        new Error('registryInfo.getPair result is undefined')
      );
    }

    const txTokenIn = await fetchWriteToERC20({
      contractParameters: { address: tokenInAddress, signer },
      methods: {
        approve: [registryInfo.getPair, ethers.BigNumber.from(tokenInValue)],
      },
    });

    if (txTokenIn instanceof globalThis.Error) {
      return Promise.reject(txTokenIn);
    }

    await txTokenIn.approve.wait();

    await fetchWriteToRouter({
      contractParameters: { signer },
      methods: {
        swapIn: [
          tokenInAddress,
          tokenOutAddress,
          ethers.BigNumber.from(tokenInValue),
          ethers.BigNumber.from(tokenOutMin),
        ],
      },
    });

    return undefined;
  }
);

export { swapIn };
