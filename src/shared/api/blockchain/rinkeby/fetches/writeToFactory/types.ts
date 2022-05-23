import { Signer } from 'ethers';

import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { FactoryWriteAPI } from '../../../types';

type QueryParameters = {
  contractParameters: {
    signer: Signer;
  };
  methods: Partial<RecordMethodsToItsParameters<FactoryWriteAPI>>;
};
type Response = RecordMethodsToItsReturnType<FactoryWriteAPI>;

export type { QueryParameters, Response };
