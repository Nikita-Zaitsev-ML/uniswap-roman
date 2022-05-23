import { callContractMethods } from '../../../utils';
import type { QueryParameters, Response } from './types';

const fetch = async (
  options: QueryParameters
): Promise<Response | globalThis.Error> => {
  return callContractMethods(options);
};

export { fetch };
