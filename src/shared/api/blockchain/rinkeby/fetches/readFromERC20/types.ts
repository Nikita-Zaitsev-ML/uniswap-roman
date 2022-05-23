import type { Provider } from '@ethersproject/abstract-provider';

import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { Address, ERC20ReadAPI } from '../../../types';

type QueryParameters = {
  contractParameters: {
    address: Address;
    provider: Provider;
  };
  methods: Partial<RecordMethodsToItsParameters<ERC20ReadAPI>>;
};
type Response = Partial<RecordMethodsToItsReturnType<ERC20ReadAPI>>;

export type { QueryParameters, Response };
