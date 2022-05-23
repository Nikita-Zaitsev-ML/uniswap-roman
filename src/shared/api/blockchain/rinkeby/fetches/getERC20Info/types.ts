import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { initContract } from '../../initContract';
import { ERC20ReadAPI } from '../../../types';

type QueryParameters = {
  contractParameters: Parameters<typeof initContract>;
  methods: Partial<RecordMethodsToItsParameters<ERC20ReadAPI>>;
};
type Response = Partial<RecordMethodsToItsReturnType<ERC20ReadAPI>>;

export type { QueryParameters, Response };
