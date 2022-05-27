import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { defaults } from 'lodash';

import { Token, Pair, State } from '../../types';
import { initialState } from '../initialState';
import { getTokens, getPairs, getFee } from './tasks';

type Options = {
  userAddress: string;
  provider: ethers.providers.Web3Provider;
};

const getData = createAsyncThunk(
  'Container/getData',
  async ({ userAddress, provider }: Options): Promise<State['data']> => {
    const tokens = await getTokens({ userAddress, provider });

    if (tokens instanceof globalThis.Error) {
      return Promise.reject(tokens);
    }

    const fullTokens = tokens.filter(
      ({ address, name, userBalance, decimals }) => {
        const isFull =
          address !== undefined &&
          name !== undefined &&
          userBalance !== undefined &&
          decimals !== undefined;

        return isFull;
      }
    ) as Token[];

    const pairs = await getPairs({ userAddress, provider, tokens: fullTokens });

    if (pairs instanceof globalThis.Error) {
      return Promise.reject(pairs);
    }

    const fullPairs = pairs.filter(
      ({ address, userBalance, decimals, proportion }) => {
        const isFull =
          address !== undefined &&
          userBalance !== undefined &&
          decimals !== undefined &&
          proportion !== undefined;

        return isFull;
      }
    ) as Pair[];

    const fee = await getFee({ provider });

    if (fee instanceof globalThis.Error) {
      return Promise.reject(fee);
    }

    const fullFee = defaults(fee, initialState.data.fee);

    return { tokens: fullTokens, pairs: fullPairs, fee: fullFee };
  }
);

export { getData };
