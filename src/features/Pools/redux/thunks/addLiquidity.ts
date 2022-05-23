import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import type { Provider } from '@ethersproject/abstract-provider';

import { fetchReadFromRegistry } from 'src/shared/api/blockchain/rinkeby/fetches/readFromRegistry';
import { fetchWriteToRouter } from 'src/shared/api/blockchain/rinkeby/fetches/writeToRouter';
import { fetchWriteToFactory } from 'src/shared/api/blockchain/rinkeby/fetches/writeToFactory';
import { fetchWriteToERC20 } from 'src/shared/api/blockchain/rinkeby/fetches/writeToERC20';

type Options = {
  tokenInAddress: string;
  tokenInValue: number;
  tokenInDecimals: number;
  tokenOutAddress: string;
  tokenOutValue: number;
  tokenOutDecimals: number;
  provider: Provider;
  signer: ethers.Signer;
};

const addLiquidity = createAsyncThunk(
  'Pools/addLiquidity',
  async ({
    tokenInAddress,
    tokenInValue,
    tokenInDecimals,
    tokenOutAddress,
    tokenOutValue,
    tokenOutDecimals,
    provider,
    signer,
  }: Options): Promise<void> => {
    let registryInfo = await fetchReadFromRegistry({
      contractParameters: { provider },
      methods: { getPair: [tokenInAddress, tokenOutAddress] },
    });

    if (registryInfo instanceof globalThis.Error) {
      return Promise.reject(registryInfo.message);
    }

    if (registryInfo?.getPair === undefined) {
      return Promise.reject(
        new Error('registryInfo.getPair result is undefined')
      );
    }

    const hasPair = !/^0x0+$/.test(registryInfo.getPair);

    if (!hasPair) {
      const writeToFactoryResult = await fetchWriteToFactory({
        contractParameters: { signer },
        methods: { createPair: [tokenInAddress, tokenOutAddress] },
      });

      if (writeToFactoryResult instanceof globalThis.Error) {
        return Promise.reject(writeToFactoryResult.message);
      }

      registryInfo = await fetchReadFromRegistry({
        contractParameters: { provider },
        methods: { getPair: [tokenInAddress, tokenOutAddress] },
      });

      if (registryInfo instanceof globalThis.Error) {
        return Promise.reject(registryInfo.message);
      }

      if (registryInfo?.getPair === undefined) {
        return Promise.reject(
          new Error('registryInfo.getPair result is undefined')
        );
      }
    }

    const tokenInTransaction = await fetchWriteToERC20({
      contractParameters: { address: tokenInAddress, signer },
      methods: {
        approve: [
          registryInfo.getPair,
          ethers.utils.parseUnits(`${tokenInValue}`, tokenInDecimals),
        ],
      },
    });

    if (tokenInTransaction instanceof globalThis.Error) {
      return Promise.reject(tokenInTransaction);
    }

    const tokenOutTransaction = await fetchWriteToERC20({
      contractParameters: { address: tokenOutAddress, signer },
      methods: {
        approve: [
          registryInfo.getPair,
          ethers.utils.parseUnits(`${tokenOutValue}`, tokenOutDecimals),
        ],
      },
    });

    if (tokenOutTransaction instanceof globalThis.Error) {
      return Promise.reject(tokenOutTransaction);
    }

    await tokenInTransaction.approve.wait();
    await tokenOutTransaction.approve.wait();

    await fetchWriteToRouter({
      contractParameters: { signer },
      methods: {
        addLiquidity: [
          tokenInAddress,
          tokenOutAddress,
          ethers.utils.parseUnits(`${tokenInValue}`, tokenInDecimals),
          ethers.utils.parseUnits(`${tokenOutValue}`, tokenOutDecimals),
        ],
      },
    });

    return undefined;
  }
);

export { addLiquidity };
