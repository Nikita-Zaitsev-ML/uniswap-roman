import type { Provider } from '@ethersproject/abstract-provider';

import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { RegistryReadAPI } from '../../../types';

type QueryParameters = {
  contractParameters: {
    provider: Provider;
  };
  methods: Partial<RecordMethodsToItsParameters<RegistryReadAPI>>;
};
type Response = Partial<RecordMethodsToItsReturnType<RegistryReadAPI>>;

export type { QueryParameters, Response };
