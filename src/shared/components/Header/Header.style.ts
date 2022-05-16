import { css, alpha } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

const createStyles = (props: {}, theme: Theme) => ({
  root: () => css`
    color: ${alpha(theme.palette.primary.contrastText, 1)};
    padding-top: ${theme.spacing(50)};
    padding-bottom: ${theme.spacing(50)};
    background: ${theme.palette.primary.main};
    box-shadow: ${theme.shadows[0]};
  `,
  toolbar: () => css`
    justify-content: space-between;
    min-height: auto;
  `,
  titleLayout: () => css``,
  title: () => css`
    line-height: ${theme.typography.pxToRem(26)};
    font-weight: ${theme.typography.h5.fontWeight};
  `,
  subTitle: () => css`
    color: ${alpha(theme.palette.primary.contrastText, 0.7)};
  `,
  navigation: () => css``,
});

export { createStyles };
