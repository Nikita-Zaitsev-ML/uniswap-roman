import { ethers } from 'ethers';

import {
  ReadFromERC20Response,
  fetchReadFromERC20,
} from 'src/shared/api/blockchain/rinkeby/fetches/readFromERC20';
import { contracts } from 'src/shared/api/blockchain/rinkeby/constants';

import { Token } from '../../../types';

type Options = {
  userAddress: string;
  provider: ethers.providers.Web3Provider;
};

type FetchedData = Pick<
  ReadFromERC20Response,
  'name' | 'balanceOf' | 'decimals'
> & { address: string };

const getTokens = async ({
  userAddress,
  provider,
}: Options): Promise<Partial<Token>[] | Error> => {
  const result = await Promise.all(
    contracts.tokens.map(async ({ address }) => {
      const contractInfo = await fetchReadFromERC20({
        contractParameters: { address, provider },
        methods: { name: [], balanceOf: [userAddress], decimals: [] },
      });

      if (contractInfo instanceof globalThis.Error) {
        return contractInfo;
      }

      return { ...contractInfo, address };
    })
  );

  const error = result.find((res) => res instanceof globalThis.Error) as
    | Error
    | undefined;

  if (error !== undefined) {
    return error;
  }

  return (<FetchedData[]>result).map(
    ({ address, name, balanceOf, decimals }) => {
      return {
        address,
        name,
        decimals,
        userBalance: balanceOf?.toString(),
      };
    }
  );
};

export { getTokens };
