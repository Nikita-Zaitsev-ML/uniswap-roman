import { initContract } from '../rinkeby/initContract';

const callContractMethods = async <
  QueryParameters extends {
    contractParameters: Parameters<typeof initContract>;
    methods: { [key: string]: unknown[] };
  },
  Response
>({
  contractParameters,
  methods,
}: QueryParameters): Promise<Response | globalThis.Error> => {
  try {
    const contract = initContract(...contractParameters);
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
  } catch (error) {
    return <globalThis.Error>error;
  }
};

export { callContractMethods };
