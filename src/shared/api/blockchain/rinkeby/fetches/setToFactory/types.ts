import {
  RecordMethodsToItsParameters,
  RecordMethodsToItsReturnType,
} from 'src/shared/types';

import { initContract } from '../../initContract';
import { FactoryWriteAPI } from '../../../types';

type QueryParameters = {
  contractParameters: Parameters<typeof initContract>;
  methods: Partial<RecordMethodsToItsParameters<FactoryWriteAPI>>;
};
type Response = RecordMethodsToItsReturnType<FactoryWriteAPI>;

export type { QueryParameters, Response };
