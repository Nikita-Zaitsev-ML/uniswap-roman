import { Signer } from 'ethers';

import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { RouterWriteAPI } from '../../../types';

type QueryParameters = {
  contractParameters: { signer: Signer };
  methods: Partial<RecordMethodsToItsParameters<RouterWriteAPI>>;
};
type Response = RecordMethodsToItsReturnType<RouterWriteAPI>;

export type { QueryParameters, Response };
