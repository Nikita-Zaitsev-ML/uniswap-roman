import { ethers } from 'ethers';

const callContractMethods = async <
  QueryParameters extends {
    contractParameters: ConstructorParameters<typeof ethers.Contract>;
    methods: { [key: string]: unknown[] };
  },
  Response
>({
  contractParameters,
  methods,
}: QueryParameters): Promise<Response | globalThis.Error> => {
  try {
    const contract = new ethers.Contract(...contractParameters);

    const entries = Object.entries(methods);

    const data = await Promise.all(
      entries.map(([methodName, args]) => {
        return contract[methodName](...args);
      })
    );

    const result = data.reduce((acc, value, index) => {
      const [methodName] = entries[index];

      return { ...acc, [methodName]: value };
    }, {});

    return result;
  } catch (error: any) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return new Error(error.message);
    }

    return <globalThis.Error>error;
  }
};

export { callContractMethods };
