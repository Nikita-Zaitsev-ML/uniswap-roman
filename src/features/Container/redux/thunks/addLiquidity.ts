import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { fetchReadFromRegistry } from 'src/shared/api/blockchain/rinkeby/fetches/readFromRegistry';
import { fetchWriteToRouter } from 'src/shared/api/blockchain/rinkeby/fetches/writeToRouter';
import { fetchWriteToFactory } from 'src/shared/api/blockchain/rinkeby/fetches/writeToFactory';
import { fetchWriteToERC20 } from 'src/shared/api/blockchain/rinkeby/fetches/writeToERC20';

type Options = {
  tokenInAddress: string;
  tokenInValue: string;
  tokenOutAddress: string;
  tokenOutValue: string;
  provider: ethers.providers.Web3Provider;
  signer: ethers.Signer;
};

const addLiquidity = createAsyncThunk(
  'Container/addLiquidity',
  async ({
    tokenInAddress,
    tokenInValue,
    tokenOutAddress,
    tokenOutValue,
    provider,
    signer,
  }: Options): Promise<void> => {
    let registryInfo = await fetchReadFromRegistry({
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

    const hasPair = !/^0x0+$/.test(registryInfo.getPair);

    if (!hasPair) {
      const writeToFactoryResult = await fetchWriteToFactory({
        contractParameters: { signer },
        methods: { createPair: [tokenInAddress, tokenOutAddress] },
      });

      if (writeToFactoryResult instanceof globalThis.Error) {
        return Promise.reject(writeToFactoryResult);
      }

      registryInfo = await fetchReadFromRegistry({
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

    const txTokenOut = await fetchWriteToERC20({
      contractParameters: { address: tokenOutAddress, signer },
      methods: {
        approve: [registryInfo.getPair, ethers.BigNumber.from(tokenOutValue)],
      },
    });

    if (txTokenOut instanceof globalThis.Error) {
      return Promise.reject(txTokenOut);
    }

    await txTokenIn.approve.wait();
    await txTokenOut.approve.wait();

    const txRouter = await fetchWriteToRouter({
      contractParameters: { signer },
      methods: {
        addLiquidity: [
          tokenInAddress,
          tokenOutAddress,
          ethers.BigNumber.from(tokenInValue),
          ethers.BigNumber.from(tokenOutValue),
        ],
      },
    });

    if (txRouter instanceof globalThis.Error) {
      return Promise.reject(txRouter);
    }

    await txRouter.addLiquidity.wait();

    return undefined;
  }
);

export { addLiquidity };
