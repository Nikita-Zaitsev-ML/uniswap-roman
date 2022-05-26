import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import {
  ReadFromERC20Response,
  fetchReadFromERC20,
} from 'src/shared/api/blockchain/rinkeby/fetches/readFromERC20';
import { contracts } from 'src/shared/api/blockchain/rinkeby/constants';

type Options = {
  userAddress: string;
  provider: ethers.providers.Web3Provider;
};

type FetchedData = Pick<
  ReadFromERC20Response,
  'name' | 'balanceOf' | 'decimals'
> & { address: string };

const getTokens = createAsyncThunk(
  'Pools/getTokens',
  async ({ userAddress, provider }: Options): Promise<FetchedData[]> => {
    const result = await Promise.all(
      contracts.tokens.map(async ({ address }) => {
        const contractInfo = await fetchReadFromERC20({
          contractParameters: { address, provider },
          methods: { name: [], balanceOf: [userAddress], decimals: [] },
        });

        return { ...contractInfo, address };
      })
    );

    const error = result.find((res) => res instanceof globalThis.Error);

    if (error !== undefined) {
      return Promise.reject(error);
    }

    return result.map(({ address, name, balanceOf, decimals }: FetchedData) => {
      return {
        address,
        name,
        decimals,
        userBalance: balanceOf?.toString(),
      };
    });
  }
);

export { getTokens };
