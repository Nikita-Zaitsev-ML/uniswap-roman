import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './LazyContainer';

const createStyles = (
  props: Required<Pick<Props, 'buttonTopMargin'>>,
  theme: Theme
) => ({
  root: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  button: css`
    width: ${theme.spacing(169)};
    height: ${theme.spacing(36)};
    margin-top: ${theme.spacing(props.buttonTopMargin)};
    border-radius: ${theme.spacing(18)};
    font-size: ${theme.typography.pxToRem(14)};
    font-weight: ${theme.typography.fontWeightRegular};

    @media print, screen and (max-width: ${theme.breakpoints.values.sm}px) {
      margin-top: ${theme.spacing(28)};
    }
  `,
});

export { createStyles };
