import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

const createStyles = (props: {}, theme: Theme) => ({
  root: () => css``,
  breadcrumbs: () => css`
    display: none;

    @media print, screen and (min-width: ${theme.breakpoints.values.sm}px) {
      display: block;
    }

    & .MuiBreadcrumbs-li {
      font-family: ${theme.typography.button.fontFamily};
      font-weight: ${theme.typography.button.fontWeight};
      font-size: ${theme.typography.button.fontSize};
      line-height: ${theme.typography.button.lineHeight};
      letter-spacing: ${theme.typography.button.letterSpacing};
      text-transform: ${theme.typography.button.textTransform};
    }
    & .MuiBreadcrumbs-separator {
      margin-left: ${theme.typography.pxToRem(24)};
      margin-right: ${theme.typography.pxToRem(24)};
    }
  `,
  menuButton: () => {
    return css`
      display: block;
      cursor: pointer;

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

    & .MuiMenu-paper {
      background: ${theme.palette.primary.main};
    }
  `,
});

export { createStyles };
