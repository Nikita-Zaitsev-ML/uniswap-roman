import { createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import { fetchReadFromERC20Pair } from 'src/shared/api/blockchain/rinkeby/fetches/readFromERC20Pair';
import { Address } from 'src/shared/api/blockchain/types';
import { formatUnits } from 'src/shared/helpers/blockchain/numbers';
import { isError } from 'src/shared/types/guards';

import { State } from '../../types';

type Options = {
  pairAddress: Address;
  tokenIn: Address;
  tokenOut: Address;
  amountOut: ethers.BigNumber;
  provider: ethers.providers.Web3Provider;
};

const calculateAmountIn = createAsyncThunk(
  'Provider/calculateAmountIn',
  async ({
    pairAddress,
    tokenIn,
    tokenOut,
    amountOut,
    provider,
  }: Options): Promise<State['calculation']> => {
    const ERC20Pair = await fetchReadFromERC20Pair({
      contractParameters: { address: pairAddress, provider },
      methods: {
        calculateAmoutIn: [tokenIn, tokenOut, amountOut],
        decimals: [],
      },
    });

    if (isError(ERC20Pair)) {
      return Promise.reject(ERC20Pair);
    }

    if (
      ERC20Pair.calculateAmoutIn === undefined ||
      ERC20Pair.decimals === undefined
    ) {
      return Promise.reject(new Error('calculation error'));
    }

    console.log(
      'in',
      amountOut.toString(),
      ERC20Pair.calculateAmoutIn[0].toString()
    );

    return {
      action: 'in',
      value: formatUnits(ERC20Pair.calculateAmoutIn[0], ERC20Pair.decimals),
      fee: formatUnits(ERC20Pair.calculateAmoutIn[1], ERC20Pair.decimals),
      decimals: ERC20Pair.decimals,
    };
  }
);

export { calculateAmountIn };
