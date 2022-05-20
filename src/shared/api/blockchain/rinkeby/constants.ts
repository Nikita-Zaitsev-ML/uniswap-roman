const factoryABI = [
  'event CreatePair(address pair)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event SetFee(address fee)',
  'event SetRegistry(address registry)',
  'event SetRouter(address router)',
  'function createPair(address token0, address token1)',
  'function fee() view returns (address)',
  'function owner() view returns (address)',
  'function renounceOwnership()',
  'function router() view returns (address)',
  'function setFee(address _fee)',
  'function setRegistry(address _registry)',
  'function setRouter(address _router)',
  'function transferOwnership(address newOwner)',
];

const routerABI = [
  'event AddLiquidity(address indexed sender, uint256 amount0, uint256 amount1)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event RemoveLiquidity(address indexed sender, uint256 amountLP)',
  'event SetRegistry(address registry)',
  'event Swap(address indexed sender, uint256 amountIn, uint256 amountOut)',
  'function addLiquidity(address token0, address token1, uint256 amount0, uint256 amount1)',
  'function owner() view returns (address)',
  'function removeLiquidity(address token0, address token1, uint256 amountLP)',
  'function renounceOwnership()',
  'function setRegistry(address _registry)',
  'function swapIn(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut) returns (uint256 amountOut)',
  'function swapOut(address tokenIn, address tokenOut, uint256 amountOut, uint256 maxAmountIn) returns (uint256 amountIn)',
  'function transferOwnership(address newOwner)',
];

const registryABI = [
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event SetFactory(address factory)',
  'event SetPair(address token0, address token1, address pair)',
  'function allPairs(uint256) view returns (address)',
  'function allPairsLength() view returns (uint256)',
  'function factory() view returns (address)',
  'function getPair(address token0, address token1) view returns (address pairAddress)',
  'function getPairAddress(address, address) view returns (address)',
  'function owner() view returns (address)',
  'function renounceOwnership()',
  'function setFactory(address _factory)',
  'function setPair(address token0, address token1, address pairAddress)',
  'function transferOwnership(address newOwner)',
];

const feeABI = [
  'constructor(uint256 _swapFee, uint256 _protocolPerformanceFee, uint256 _feeDecimals)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event SetFeeParams(uint256 swapFee, uint256 protocolPerformanceFee, uint256 feeDecimals)',
  'function feeDecimals() view returns (uint256)',
  'function owner() view returns (address)',
  'function protocolPerformanceFee() view returns (uint256)',
  'function renounceOwnership()',
  'function setFeeParams(uint256 _swapFee, uint256 _protocolPerformanceFee, uint256 _feeDecimals)',
  'function swapFee() view returns (uint256)',
  'function transferOwnership(address newOwner)',
];

const ERC20ABI = [
  'constructor(string name, string symbol, uint256 amount)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)',
  'function increaseAllowance(address spender, uint256 addedValue) returns (bool)',
  'function mint(uint256 supply)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
];

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
    { address: '0x63706eDd35835972F46dd3EB09Ad4405d4e3A168', ABI: ERC20ABI },
    { address: '0x781F8B032eFd365e56EC96564874937966Fb00e1', ABI: ERC20ABI },
    { address: '0x868e178aC30E926999F0DFEC18F485826427aA2e', ABI: ERC20ABI },
  ],
};

export { contracts };
