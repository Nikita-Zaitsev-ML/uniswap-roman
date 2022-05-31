import { BigNumber, ethers, Transaction } from 'ethers';
import { AccessList } from 'ethers/lib/utils';

type Address = string;

type FactoryReadAPI = {
  fee: () => Address;
  owner: () => Address;
  router: () => Address;
};
type FactoryWriteAPI = {
  createPair: (token0: Address, token1: Address) => TransactionResponse;
  renounceOwnership: () => TransactionResponse;
  setFee: (_fee: Address) => TransactionResponse;
  setRegistry: (_registry: Address) => TransactionResponse;
  setRouter: (_router: Address) => TransactionResponse;
  transferOwnership: (newOwner: Address) => TransactionResponse;
};
type FactoryAPI = FactoryReadAPI & FactoryWriteAPI;

type RouterReadAPI = { owner: () => Address };
type RouterWriteAPI = {
  addLiquidity: (
    token0: Address,
    token1: Address,
    amount0: BigNumber,
    amount1: BigNumber
  ) => TransactionResponse;
  removeLiquidity: (
    token0: Address,
    token1: Address,
    amountLP: BigNumber
  ) => TransactionResponse;
  renounceOwnership: () => TransactionResponse;
  setRegistry: (_registry: Address) => TransactionResponse;
  swapIn: (
    tokenIn: Address,
    tokenOut: Address,
    amountIn: BigNumber,
    minAmountOut: BigNumber
  ) => TransactionResponse;
  swapOut: (
    tokenIn: Address,
    tokenOut: Address,
    amountOut: BigNumber,
    maxAmountIn: BigNumber
  ) => TransactionResponse;
  transferOwnership: (newOwner: Address) => TransactionResponse;
};
type RouterAPI = RouterReadAPI & RouterWriteAPI;

type RegistryReadAPI = {
  allPairs: (index: BigNumber) => Address;
  allPairsLength: () => BigNumber;
  factory: () => Address;
  getPair: (token0: Address, token1: Address) => Address;
  owner: () => Address;
};
type RegistryWriteAPI = {
  renounceOwnership: () => TransactionResponse;
  setFactory: (_factory: Address) => TransactionResponse;
  setPair: (
    token0: Address,
    token1: Address,
    pairAddress: Address
  ) => TransactionResponse;
  transferOwnership: (newOwner: Address) => TransactionResponse;
};
type RegistryAPI = RegistryReadAPI & RegistryWriteAPI;

type FeeReadAPI = {
  feeDecimals: () => BigNumber;
  owner: () => Address;
  protocolPerformanceFee: () => BigNumber;
  swapFee: () => BigNumber;
};
type FeeWriteAPI = {
  renounceOwnership: () => TransactionResponse;
  setFeeParams: (
    _swapFee: BigNumber,
    _protocolPerformanceFee: BigNumber,
    _feeDecimals: BigNumber
  ) => TransactionResponse;
  transferOwnership: (newOwner: Address) => TransactionResponse;
};
type FeeAPI = FeeReadAPI & FeeWriteAPI;

type ERC20ReadAPI = {
  allowance: (owner: Address, spender: Address) => BigNumber;
  balanceOf: (account: Address) => BigNumber;
  decimals: () => number;
  name: () => string;
  symbol: () => string;
  totalSupply: () => BigNumber;
};
type ERC20WriteAPI = {
  approve: (spender: Address, amount: BigNumber) => TransactionResponse;
  decreaseAllowance: (
    spender: Address,
    subtractedValue: BigNumber
  ) => TransactionResponse;
  increaseAllowance: (
    spender: Address,
    addedValue: BigNumber
  ) => TransactionResponse;
  mint: (supply: BigNumber) => TransactionResponse;
  transfer: (to: Address, amount: BigNumber) => TransactionResponse;
  transferFrom: (
    from: Address,
    to: Address,
    amount: BigNumber
  ) => TransactionResponse;
};
type ERC20API = ERC20ReadAPI & ERC20WriteAPI;

type ERC20PairReadAPI = {
  allowance(owner: Address, spender: Address): ethers.BigNumber;
  balanceOf(account: Address): ethers.BigNumber;
  calculateAmoutIn(
    tokenIn: Address,
    tokenOut: Address,
    amountOut: ethers.BigNumber
  ): [amountIn: ethers.BigNumber, tokenInFee: ethers.BigNumber];
  calculateAmoutOut(
    tokenIn: Address,
    tokenOut: Address,
    amountIn: ethers.BigNumber
  ): [amountOut: ethers.BigNumber, tokenOutFee: ethers.BigNumber];
  decimals(): number;
  fee(): Address;
  getReserve(index: ethers.BigNumber): ethers.BigNumber;
  name(): string;
  owner(): Address;
  reserves(index: ethers.BigNumber): ethers.BigNumber;
  router(): Address;
  symbol(): Address;
  totalSupply(): ethers.BigNumber;
};
type ERC20PairWriteAPI = {
  addLiquidity(
    recipient: Address,
    amount0: ethers.BigNumber,
    amount1: ethers.BigNumber
  ): void;
  approve(spender: Address, amount: ethers.BigNumber): boolean;
  decreaseAllowance(
    spender: Address,
    subtractedValue: ethers.BigNumber
  ): boolean;
  increaseAllowance(spender: Address, addedValue: ethers.BigNumber): boolean;
  removeLiquidity(_amountLP: ethers.BigNumber, recipient: Address): void;
  renounceOwnership(): void;
  setFee(_fee: Address): void;
  setRouter(_router: Address): void;
  swap(
    tokenIn: Address,
    tokenOut: Address,
    amountIn: ethers.BigNumber,
    amountOut: ethers.BigNumber,
    tokenFee: Address,
    totalFee: ethers.BigNumber,
    recipient: Address
  ): void;
  transfer(to: Address, amount: ethers.BigNumber): boolean;
  transferFrom(from: Address, to: Address, amount: ethers.BigNumber): boolean;
  transferOwnership(newOwner: Address): void;
};
type ERC20PairAPI = ERC20ReadAPI & ERC20WriteAPI;

// https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse
type TransactionResponse = Transaction & {
  blockNumber: number;
  blockHash: string;
  timestamp: number;
  confirmations: number;
  raw: string;
  type: number;
  accessList: AccessList;
  wait: () => Promise<TransactionReceipt>;
};

// TODO:https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
type TransactionReceipt = unknown;

export type {
  Address,
  FactoryReadAPI,
  FactoryWriteAPI,
  FactoryAPI,
  RouterReadAPI,
  RouterWriteAPI,
  RouterAPI,
  RegistryReadAPI,
  RegistryWriteAPI,
  RegistryAPI,
  FeeReadAPI,
  FeeWriteAPI,
  FeeAPI,
  ERC20ReadAPI,
  ERC20WriteAPI,
  ERC20API,
  ERC20PairReadAPI,
  ERC20PairWriteAPI,
  ERC20PairAPI,
  TransactionResponse,
};
