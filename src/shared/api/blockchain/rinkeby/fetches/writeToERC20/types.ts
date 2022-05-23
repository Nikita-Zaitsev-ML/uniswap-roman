import { Signer } from 'ethers';

import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { Address, ERC20WriteAPI } from '../../../types';

type QueryParameters = {
  contractParameters: {
    address: Address;
    signer: Signer;
  };
  methods: Partial<RecordMethodsToItsParameters<ERC20WriteAPI>>;
};
type Response = RecordMethodsToItsReturnType<ERC20WriteAPI>;

export type { QueryParameters, Response };
