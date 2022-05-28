import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

const createStyles = (theme: Theme) => ({
  root: () => css`
    width: ${theme.spacing(300)};
    border-radius: ${theme.spacing(24)};
    background: ${theme.palette.background.paper};
    box-shadow: ${theme.shadows[13]};
  `,
  header: () => css`
    display: flex;
    justify-content: space-between;
  `,
  title: () => css``,
  panel: () => css`
    display: grid;
    gap: ${theme.spacing(8)};
  `,
  pair: () => css`
    display: grid;
    grid: 'title balance' ' deleteBtn deleteBtn';
    gap: ${theme.spacing(8)};
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing(8)};
    border: 1px solid ${theme.palette.primary.main};
    word-break: break-word;
  `,
  pairTitle: () => css`
    grid-area: title;
  `,
  pairBalance: () => css`
    grid-area: balance;
    line-height: ${theme.typography.body1.lineHeight};
  `,
  pairDeleteBtn: () => css`
    grid-area: deleteBtn;
  `,
});

export { createStyles };
