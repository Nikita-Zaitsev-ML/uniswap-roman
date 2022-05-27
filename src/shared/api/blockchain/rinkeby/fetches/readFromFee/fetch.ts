import { callContractMethods } from '../../../utils';
import { contracts } from '../../constants';
import type { QueryParameters, Response } from './types';

const fetch = async ({
  contractParameters,
  methods,
}: QueryParameters): Promise<Response | globalThis.Error> => {
  const { provider } = contractParameters;
  const { address, ABI } = contracts.fee;

  return callContractMethods({
    contractParameters: [address, ABI, provider],
    methods,
  });
};

export { fetch };
