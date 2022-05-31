# Uniswap

## Description

Clone of [uniswap](https://app.uniswap.org/) for education purpose.

Functional:

- registration of a token pair that does not exist yet;
- replenishment of the pair's liquidity;
- withdrawal of liquidity;
- swap pairs;
- commissions for users-holders of liquidity;
- platform commission.

## Demo

[demo](https://uniswap-roman.vercel.app/)

Useful links:

- [metamask](https://metamask.io/);
- [rinkeby](https://www.rinkeby.io/);
- [rinkeby scan](https://rinkeby.etherscan.io/);
- [rinkeby faucet](https://rinkebyfaucet.com/);
- [ERC20 docs](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20)
- [contracts](./src/shared/api/blockchain/rinkeby/constants.ts);

## Contribution

### Installation

```bash
git clone https://github.com/Nikita-Zaitsev-ML/uniswap.git
cd uniswap
npm i
```

### Managing

In package.json you can find useful scripts for managing the project. To run script, use the following command:

```bash
npm run {script-name}
```

Script-names:

- dev - builds bundles and runs server to be upgraded;
- build - build minify bundles and place it into .next directory;
- start - just builds bundles and place it into .next directory;
- test - runs tests;
- lint - lint styles and scripts, show result;
- lint:fix - use prettier for all known files, lint styles and scripts, auto fix files with errors if it is possible, show result;
- storybook - runs storybook.
