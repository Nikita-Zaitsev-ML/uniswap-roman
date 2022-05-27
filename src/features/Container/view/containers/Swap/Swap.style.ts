import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

const createStyles = (theme: Theme) => ({
  root: () => css``,
  hint: () => css`
    display: grid;
    row-gap: ${theme.spacing(4)};
  `,
  proportion: () =>
    css`
      word-break: break-word;
    `,
  commission: () =>
    css`
      word-break: break-word;
    `,
});

export { createStyles };
