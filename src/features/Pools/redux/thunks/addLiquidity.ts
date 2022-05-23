import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { fetchGetRegistryInfo } from 'src/shared/api/blockchain/rinkeby/fetches/getRegistryInfo';
import { fetchSetToRouter } from 'src/shared/api/blockchain/rinkeby/fetches/setToRouter';
import { fetchSetToERC20 } from 'src/shared/api/blockchain/rinkeby/fetches/setToERC20';
import { contracts } from 'src/shared/api/blockchain/rinkeby';
import { fetchSetToFactory } from 'src/shared/api/blockchain/rinkeby/fetches/setToFactory';

type Options = {
  tokenInAddress: string;
  tokenInValue: number;
  tokenInDecimals: number;
  tokenOutAddress: string;
  tokenOutValue: number;
  tokenOutDecimals: number;
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
    signer,
  }: Options): Promise<void> => {
    const { registry, factory, router, tokens } = contracts;
    const { address: registryAddress, ABI: registryABI } = registry;
    const { address: routerAddress, ABI: routerABI } = router;
    const { address: factoryAddress, ABI: factoryABI } = factory;
    const tokenIn = tokens.find((token) => token.address === tokenInAddress);
    const tokenOut = tokens.find((token) => token.address === tokenOutAddress);

    let registryInfo = await fetchGetRegistryInfo({
      contractParameters: [registryAddress, registryABI, signer],
      methods: { getPair: [tokenInAddress, tokenOutAddress] },
    });

    if (tokenIn?.ABI === undefined || tokenOut?.ABI === undefined) {
      return Promise.reject(new Error('tokens ABI are undefined'));
    }

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
      const setToFactoryResult = await fetchSetToFactory({
        contractParameters: [factoryAddress, factoryABI, signer],
        methods: { createPair: [tokenInAddress, tokenOutAddress] },
      });

      if (setToFactoryResult instanceof globalThis.Error) {
        return Promise.reject(setToFactoryResult.message);
      }

      registryInfo = await fetchGetRegistryInfo({
        contractParameters: [registryAddress, registryABI, signer],
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

    const tokenInTransaction = await fetchSetToERC20({
      contractParameters: [tokenInAddress, tokenIn?.ABI, signer],
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

    const tokenOutTransaction = await fetchSetToERC20({
      contractParameters: [tokenOutAddress, tokenOut?.ABI, signer],
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

    await fetchSetToRouter({
      contractParameters: [routerAddress, routerABI, signer],
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
