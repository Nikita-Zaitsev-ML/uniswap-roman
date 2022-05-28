import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { fetchReadFromRegistry } from 'src/shared/api/blockchain/rinkeby/fetches/readFromRegistry';
import { fetchWriteToRouter } from 'src/shared/api/blockchain/rinkeby/fetches/writeToRouter';
import { fetchWriteToFactory } from 'src/shared/api/blockchain/rinkeby/fetches/writeToFactory';
import { fetchWriteToERC20 } from 'src/shared/api/blockchain/rinkeby/fetches/writeToERC20';
import { isError } from 'src/shared/types/guards';

type Options = {
  tokenInAddress: string;
  tokenInValue: ethers.BigNumber;
  tokenOutAddress: string;
  tokenOutValue: ethers.BigNumber;
  provider: ethers.providers.Web3Provider;
  signer: ethers.Signer;
};

const addLiquidity = createAsyncThunk(
  'Provider/addLiquidity',
  async ({
    tokenInAddress,
    tokenInValue,
    tokenOutAddress,
    tokenOutValue,
    provider,
    signer,
  }: Options): Promise<void> => {
    let registry = await fetchReadFromRegistry({
      contractParameters: { provider },
      methods: { getPair: [tokenInAddress, tokenOutAddress] },
    });

    if (isError(registry)) {
      return Promise.reject(registry);
    }

    if (registry?.getPair === undefined) {
      return Promise.reject(new Error('registry.getPair result is undefined'));
    }

    const hasPair = !/^0x0+$/.test(registry.getPair);

    if (!hasPair) {
      const txFactory = await fetchWriteToFactory({
        contractParameters: { signer },
        methods: { createPair: [tokenInAddress, tokenOutAddress] },
      });

      if (isError(txFactory)) {
        return Promise.reject(txFactory);
      }

      await txFactory.createPair.wait();

      registry = await fetchReadFromRegistry({
        contractParameters: { provider },
        methods: { getPair: [tokenInAddress, tokenOutAddress] },
      });

      if (isError(registry)) {
        return Promise.reject(registry);
      }

      if (registry?.getPair === undefined) {
        return Promise.reject(
          new Error('registry.getPair result is undefined')
        );
      }
    }

    const txTokenIn = await fetchWriteToERC20({
      contractParameters: { address: tokenInAddress, signer },
      methods: {
        approve: [registry.getPair, tokenInValue],
      },
    });

    if (isError(txTokenIn)) {
      return Promise.reject(txTokenIn);
    }

    const txTokenOut = await fetchWriteToERC20({
      contractParameters: { address: tokenOutAddress, signer },
      methods: {
        approve: [registry.getPair, tokenOutValue],
      },
    });

    if (isError(txTokenOut)) {
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
          tokenInValue,
          tokenOutValue,
        ],
      },
    });

    if (isError(txRouter)) {
      return Promise.reject(txRouter);
    }

    await txRouter.addLiquidity.wait();

    return undefined;
  }
);

export { addLiquidity };
