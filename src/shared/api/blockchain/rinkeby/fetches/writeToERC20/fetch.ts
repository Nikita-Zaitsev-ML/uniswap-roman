import { callContractMethods } from '../../../utils';
import { ERC20ABI } from '../../../constants';
import type { QueryParameters, Response } from './types';

const fetch = async ({
  contractParameters,
  methods,
}: QueryParameters): Promise<Response | globalThis.Error> => {
  const { address, signer } = contractParameters;

  return callContractMethods({
    contractParameters: [address, ERC20ABI, signer],
    methods,
  });
};

export { fetch };
