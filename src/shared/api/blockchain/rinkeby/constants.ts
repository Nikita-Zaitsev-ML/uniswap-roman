import { factoryABI, routerABI, registryABI, feeABI } from '../constants';

const contracts = {
  factory: {
    address: '0xDbd8bdedb04a3EAF8F8FA30A86210858b1D4236F',
    ABI: factoryABI,
  },
  router: {
    address: '0xBDb54E3B3e019E37eD741304960F0C68fb09F4E8',
    ABI: routerABI,
  },
  registry: {
    address: '0xb29D81e9c098c5135CF0AFCec0B3ed21B35Ea803',
    ABI: registryABI,
  },
  fee: { address: '0xf46DCdfC0A53Ff7816d3Cb4df1dE32b1aE3178b5', ABI: feeABI },
  tokens: [
    { address: '0x63706eDd35835972F46dd3EB09Ad4405d4e3A168' },
    { address: '0x781F8B032eFd365e56EC96564874937966Fb00e1' },
    { address: '0x868e178aC30E926999F0DFEC18F485826427aA2e' },
  ],
};

export { contracts };
