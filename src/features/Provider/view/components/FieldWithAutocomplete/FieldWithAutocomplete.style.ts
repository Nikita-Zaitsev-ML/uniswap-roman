import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

const createStyles = (theme: Theme) => ({
  root: () => css``,
  adornment: () =>
    css`
      width: 14em;
    `,
  autocomplete: () => css``,
  option: () => css``,
  optionAvatar: () => css`
    flex: 0 1 35%;
  `,
  optionText: () =>
    css`
      display: box;
      box-orient: vertical;
      line-clamp: 2;
      flex: 0 1 65%;
      margin-left: ${theme.spacing(8)};
      word-break: break-word;
    `,
  balance: () => css`
    display: grid;
    grid: 'btn value';
    width: 100%;
    justify-content: space-between;
    cursor: auto;
  `,
  addBalanceBtn: () => css`
    grid-area: btn;
  `,
  balanceValue: () => css`
    grid-area: value;
    display: inline-flex;
    align-items: center;
  `,
});

export { createStyles };
