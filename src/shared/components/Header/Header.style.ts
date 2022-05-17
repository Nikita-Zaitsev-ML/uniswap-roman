import { css, alpha } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

const createStyles = (props: {}, theme: Theme) => ({
  root: () => css`
    color: ${alpha(theme.palette.primary.contrastText, 1)};
    background: transparent;
    box-shadow: ${theme.shadows[0]};
  `,
  toolbar: () => css`
    justify-content: space-between;
  `,
  logo: () => css`
    color: white;
  `,
  navigation: () => css``,
  settings: () => css``,
});

export { createStyles };
