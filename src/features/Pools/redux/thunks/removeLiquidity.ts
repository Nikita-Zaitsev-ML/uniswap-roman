import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { fetchWriteToRouter } from 'src/shared/api/blockchain/rinkeby/fetches/writeToRouter';

import { Pair } from '../../types';

type Options = {
  pair: Pair;
  signer: ethers.Signer;
};

const removeLiquidity = createAsyncThunk(
  'Pools/removeLiquidity',
  async ({
    pair: { tokens, userBalance, decimals },
    signer,
  }: Options): Promise<void> => {
    const router = await fetchWriteToRouter({
      contractParameters: { signer },
      methods: {
        removeLiquidity: [
          tokens[0].address,
          tokens[1].address,
          ethers.utils.parseUnits(`${userBalance}`, decimals),
        ],
      },
    });

    if (router instanceof globalThis.Error) {
      return Promise.reject(router);
    }

    return undefined;
  }
);

export { removeLiquidity };
