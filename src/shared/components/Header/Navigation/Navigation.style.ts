import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

const createStyles = (props: {}, theme: Theme) => ({
  root: () => css``,
  breadcrumbs: () => css`
    display: none;

    @media print, screen and (min-width: ${theme.breakpoints.values.sm}px) {
      display: block;
    }
  `,
  menuButton: () => {
    return css`
      display: block;

      @media print, screen and (min-width: ${theme.breakpoints.values.sm}px) {
        display: none;
      }
    `;
  },
  menu: () => css`
    display: block;

    @media print, screen and (min-width: ${theme.breakpoints.values.sm}px) {
      display: none;
    }
  `,
});

export { createStyles };
