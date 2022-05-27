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
    flex: 0 1 33.33%;
    color: white;
  `,
  navigation: () =>
    css`
      position: fixed;
      width: fit-content;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 5%;

      @media print, screen and (min-width: ${theme.breakpoints.values.md}px) {
        position: static;
        flex: 0 1 fit-content;
      }
    `,
  settings: () => css`
    flex: 0 1 33.33%;
    display: grid;
    grid-auto-flow: column;
    gap: ${theme.spacing(4)};
  `,
});

export { createStyles };
