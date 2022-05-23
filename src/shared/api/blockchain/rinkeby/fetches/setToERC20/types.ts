import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { initContract } from '../../initContract';
import { ERC20WriteAPI } from '../../../types';

type QueryParameters = {
  contractParameters: Parameters<typeof initContract>;
  methods: Partial<RecordMethodsToItsParameters<ERC20WriteAPI>>;
};
type Response = RecordMethodsToItsReturnType<ERC20WriteAPI>;

export type { QueryParameters, Response };
