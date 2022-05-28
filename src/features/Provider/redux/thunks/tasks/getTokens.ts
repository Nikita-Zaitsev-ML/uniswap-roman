import { ethers } from 'ethers';
import { AsyncReturnType } from 'type-fest';

import { fetchReadFromERC20 } from 'src/shared/api/blockchain/rinkeby/fetches/readFromERC20';
import { contracts } from 'src/shared/api/blockchain/rinkeby/constants';
import { formatUnits } from 'src/shared/helpers/blockchain/numbers';
import { isError, isNotError } from 'src/shared/types/guards';

import { Token } from '../../../types';

type Options = {
  userAddress: string;
  provider: ethers.providers.Web3Provider;
};

type FetchedData = Exclude<
  AsyncReturnType<typeof fetchReadFromERC20>,
  globalThis.Error
> & {
  address: string;
};

const getTokens = async ({
  userAddress,
  provider,
}: Options): Promise<Partial<Token>[] | Error> => {
  const result = await Promise.all(
    contracts.tokens.map(async ({ address }): Promise<FetchedData | Error> => {
      const token = await fetchReadFromERC20({
        contractParameters: { address, provider },
        methods: { name: [], balanceOf: [userAddress], decimals: [] },
      });

      if (isError(token)) {
        return token;
      }

      return { ...token, address };
    })
  );

  const error = result.find(isError);

  if (error !== undefined) {
    return error;
  }

  return result
    .filter(isNotError)
    .map(({ address, name, balanceOf, decimals }) => {
      return {
        address,
        name,
        decimals,
        userBalance: balanceOf && formatUnits(balanceOf, decimals),
      };
    });
};

export { getTokens };
