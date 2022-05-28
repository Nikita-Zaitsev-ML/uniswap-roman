import { ethers } from 'ethers';

import { fetchReadFromERC20 } from 'src/shared/api/blockchain/rinkeby/fetches/readFromERC20';
import { fetchReadFromRegistry } from 'src/shared/api/blockchain/rinkeby/fetches/readFromRegistry';
import { Address } from 'src/shared/api/blockchain/types';
import { BigNumber, formatUnits } from 'src/shared/helpers/blockchain/numbers';
import { isError, isNotError, isNotNull } from 'src/shared/types/guards';

import { Token, Pair } from '../../../types';

type Options = {
  tokens: Token[];
  userAddress: Address;
  provider: ethers.providers.Web3Provider;
};

const getPairs = async ({
  tokens,
  userAddress,
  provider,
}: Options): Promise<Partial<Pair>[] | Error> => {
  const allPairs = [];

  for (let i = 0; i < tokens.length - 1; i += 1) {
    for (let j = i + 1; j < tokens.length; j += 1) {
      allPairs.push({ token0: tokens[i], token1: tokens[j] });
    }
  }

  const pairs = await Promise.all(
    allPairs.map(async ({ token0, token1 }) => {
      const registry = await fetchReadFromRegistry({
        contractParameters: { provider },
        methods: { getPair: [token0.address, token1.address] },
      });

      if (isError(registry)) {
        return registry;
      }

      const address = registry?.getPair || '0x0';
      const hasPair = !/^0x0+$/.test(address);

      if (!hasPair) {
        return null;
      }

      const pair = await fetchReadFromERC20({
        contractParameters: { address, provider },
        methods: { balanceOf: [userAddress], decimals: [] },
      });

      if (isError(pair)) {
        return pair;
      }

      const pairToken0 = await fetchReadFromERC20({
        contractParameters: { address: token0.address, provider },
        methods: { balanceOf: [address] },
      });

      if (isError(pairToken0)) {
        return pairToken0;
      }

      const pairToken1 = await fetchReadFromERC20({
        contractParameters: { address: token1.address, provider },
        methods: { balanceOf: [address] },
      });

      if (isError(pairToken1)) {
        return pairToken1;
      }

      const { balanceOf, decimals } = pair;
      const { balanceOf: balanceOfToken0 } = pairToken0;
      const { balanceOf: balanceOfToken1 } = pairToken1;

      const isProportionUndefined =
        balanceOfToken0 === undefined ||
        balanceOfToken1 === undefined ||
        balanceOfToken0.isZero() ||
        balanceOfToken1.isZero();

      const proportion = isProportionUndefined
        ? 'any'
        : new BigNumber(formatUnits(balanceOfToken0, token0.decimals))
            .div(formatUnits(balanceOfToken1, token1.decimals))
            .toString();

      return {
        address,
        tokens: [token0, token1],
        userBalance: balanceOf && formatUnits(balanceOf, decimals),
        decimals,
        proportion,
      };
    })
  );

  const existedPairs = pairs.filter(isNotNull);
  const pairWithError = existedPairs.find(isError);

  if (isError(pairWithError)) {
    return pairWithError;
  }

  return existedPairs.filter(isNotError);
};

export { getPairs };
