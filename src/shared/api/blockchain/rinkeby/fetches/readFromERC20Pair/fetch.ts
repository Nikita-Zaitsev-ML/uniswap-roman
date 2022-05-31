import { callContractMethods } from '../../../utils';
import { ERC20PairABI } from '../../../constants';
import type { QueryParameters, Response } from './types';

const fetch = async ({
  contractParameters,
  methods,
}: QueryParameters): Promise<Response | globalThis.Error> => {
  const { address, provider } = contractParameters;

  return callContractMethods({
    contractParameters: [address, ERC20PairABI, provider],
    methods,
  });
};

export { fetch };
