import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { contracts } from 'src/shared/api/blockchain/rinkeby';
import {
  GetERC20InfoResponse,
  fetchGetERC20Info,
} from 'src/shared/api/blockchain/rinkeby/fetches/getERC20Info';

type Options = {
  userAddress: string;
  provider: ethers.providers.Web3Provider;
};

type FetchedData = Pick<
  GetERC20InfoResponse,
  'name' | 'balanceOf' | 'decimals'
> & { address: string };

const getTokens = createAsyncThunk(
  'Pools/getTokens',
  async ({ userAddress, provider }: Options): Promise<FetchedData[]> => {
    const result = await Promise.all(
      contracts.tokens.map(async ({ address, ABI }) => {
        const contractInfo = await fetchGetERC20Info({
          contractParameters: [address, ABI, provider],
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
        userBalance: Number(ethers.utils.formatUnits(balanceOf || 0, decimals)),
      };
    });
  }
);

export { getTokens };
