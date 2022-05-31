import { ethers } from 'ethers';

import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { Address, ERC20PairReadAPI } from '../../../types';

type QueryParameters = {
  contractParameters: {
    address: Address;
    provider: ethers.providers.Web3Provider;
  };
  methods: Partial<RecordMethodsToItsParameters<ERC20PairReadAPI>>;
};
type Response = Partial<RecordMethodsToItsReturnType<ERC20PairReadAPI>>;

export type { QueryParameters, Response };
