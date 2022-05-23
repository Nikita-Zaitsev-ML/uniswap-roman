import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { initContract } from '../../initContract';
import { RegistryReadAPI } from '../../../types';

type QueryParameters = {
  contractParameters: Parameters<typeof initContract>;
  methods: Partial<RecordMethodsToItsParameters<RegistryReadAPI>>;
};
type Response = Partial<RecordMethodsToItsReturnType<RegistryReadAPI>>;

export type { QueryParameters, Response };
