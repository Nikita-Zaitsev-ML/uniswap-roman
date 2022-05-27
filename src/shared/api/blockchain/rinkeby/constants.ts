import { factoryABI, routerABI, registryABI, feeABI } from '../constants';

/*
 * TODO: new
 * const contracts = {
 *   factory: {
 *     address: '0xDbd8bdedb04a3EAF8F8FA30A86210858b1D4236F',
 *     ABI: factoryABI,
 *   },
 *   router: {
 *     address: '0xBDb54E3B3e019E37eD741304960F0C68fb09F4E8',
 *     ABI: routerABI,
 *   },
 *   registry: {
 *     address: '0xb29D81e9c098c5135CF0AFCec0B3ed21B35Ea803',
 *     ABI: registryABI,
 *   },
 *   fee: { address: '0xf46DCdfC0A53Ff7816d3Cb4df1dE32b1aE3178b5', ABI: feeABI },
 *   tokens: [
 *     { address: '0x63706eDd35835972F46dd3EB09Ad4405d4e3A168' },
 *     { address: '0x781F8B032eFd365e56EC96564874937966Fb00e1' },
 *     { address: '0x868e178aC30E926999F0DFEC18F485826427aA2e' },
 *   ],
 * };
 * pair: 0xa79daf57168addbd7437A372D3abe382277e533a
 */

const contracts = {
  factory: {
    address: '0xB734E243F7C94047463973eD57A448b3060468b7',
    ABI: factoryABI,
  },
  router: {
    address: '0x6C808CC2275598Ce7C0dbE47cca3719998F5Dd55',
    ABI: routerABI,
  },
  registry: {
    address: '0xBe56747f61566D5fABe91E3025e58FFde2BC273C',
    ABI: registryABI,
  },
  fee: { address: '0xE7312881b3134d103BaD47363DA714D8E1785E4B', ABI: feeABI },
  tokens: [
    { address: '0xc4C242fc5222e94bec23A0F49BAA5E14fD657C8C' },
    { address: '0x94bF2DACaE6bdbeA5B87205A573d2669a3A74Db7' },
    { address: '0xc8f3Bea6e551CC11C3D3c55bF4eD31f15a020E5f' },
    { address: '0xa4be15934902bc1FFb2f37e744a04B3AEd6A8B2c' },
    { address: '0x9822922C78F647Be1B060Ddf00aC49943f516536' },
  ],
};

export { contracts };
