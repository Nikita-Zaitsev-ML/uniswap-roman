import { ethers } from 'ethers';

import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { RegistryReadAPI } from '../../../types';

type QueryParameters = {
  contractParameters: {
    provider: ethers.providers.Web3Provider;
  };
  methods: Partial<RecordMethodsToItsParameters<RegistryReadAPI>>;
};
type Response = Partial<RecordMethodsToItsReturnType<RegistryReadAPI>>;

export type { QueryParameters, Response };
