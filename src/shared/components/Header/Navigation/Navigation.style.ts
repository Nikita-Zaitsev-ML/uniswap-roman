import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

const createStyles = (props: {}, theme: Theme) => ({
  root: () => css`
    background: ${theme.palette.background.paperLight};
  `,
});

export { createStyles };
