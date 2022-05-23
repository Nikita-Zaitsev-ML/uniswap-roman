import { callContractMethods } from '../../../utils';
import { contracts } from '../../constants';
import type { QueryParameters, Response } from './types';

const fetch = async ({
  contractParameters,
  methods,
}: QueryParameters): Promise<Response | globalThis.Error> => {
  const { signer } = contractParameters;
  const { router } = contracts;
  const { address, ABI } = router;

  return callContractMethods({
    contractParameters: [address, ABI, signer],
    methods,
  });
};

export { fetch };
