import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

const createStyles = (theme: Theme) => ({
  root: () => css`
    max-width: ${theme.spacing(300)};
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
  arrow: () => css`
    display: flex;
    justify-content: center;
  `,
});

export { createStyles };
