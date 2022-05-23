import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { initContract } from '../../initContract';
import { RouterWriteAPI } from '../../../types';

type QueryParameters = {
  contractParameters: Parameters<typeof initContract>;
  methods: Partial<RecordMethodsToItsParameters<RouterWriteAPI>>;
};
type Response = RecordMethodsToItsReturnType<RouterWriteAPI>;

export type { QueryParameters, Response };
