import { ethers } from 'ethers';

import { fetchReadFromERC20 } from 'src/shared/api/blockchain/rinkeby/fetches/readFromERC20';
import { fetchReadFromRegistry } from 'src/shared/api/blockchain/rinkeby/fetches/readFromRegistry';
import { Address } from 'src/shared/api/blockchain/types';
import { divDecimals } from 'src/shared/helpers/blockchain/numbers';

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

      if (registry instanceof globalThis.Error) {
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

      if (pair instanceof globalThis.Error) {
        return pair;
      }

      const pairToken0Info = await fetchReadFromERC20({
        contractParameters: { address: token0.address, provider },
        methods: { balanceOf: [address] },
      });

      if (pairToken0Info instanceof globalThis.Error) {
        return pairToken0Info;
      }

      const pairToken1Info = await fetchReadFromERC20({
        contractParameters: { address: token1.address, provider },
        methods: { balanceOf: [address] },
      });

      if (pairToken1Info instanceof globalThis.Error) {
        return pairToken1Info;
      }

      const { balanceOf, decimals } = pair;
      const { balanceOf: balanceOfToken0 } = pairToken0Info;
      const { balanceOf: balanceOfToken1 } = pairToken1Info;

      const isProportionUndefined =
        balanceOfToken0 === undefined ||
        balanceOfToken1 === undefined ||
        balanceOfToken0.isZero() ||
        balanceOfToken1.isZero();

      const proportion = isProportionUndefined
        ? 'any'
        : divDecimals(
            balanceOfToken0.toString(),
            balanceOfToken1.toString(),
            token0.decimals,
            token1.decimals
          );

      return {
        address,
        tokens: [token0, token1],
        userBalance: balanceOf?.toString(),
        decimals,
        proportion,
      };
    })
  );

  const existedPairs = <(Error | Pair)[]>pairs.filter((pair) => pair !== null);
  const pairWithError = existedPairs.find(
    (pair) => pair instanceof globalThis.Error
  );

  if (pairWithError instanceof globalThis.Error) {
    return pairWithError;
  }

  return <Partial<Pair>[]>existedPairs;
};

export { getPairs };
