import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';
import { LAYOUT_FACTOR } from 'src/shared/styles/base/constants';

const createStyles = (theme: Theme) => ({
  root: () => {
    return css`
      width: ${260 / LAYOUT_FACTOR}%;
      display: flex;
      align-items: center;
      gap: ${theme.spacing(22)};

      @media (max-width: ${theme.spacing(830)}) {
        width: auto;
      }
    `;
  },
  iconButtonPlay: css`
    width: ${theme.typography.pxToRem(40)};
    height: ${theme.typography.pxToRem(40)};
    padding: 0;
    transition: ${theme.transitions.create('opacity')};

    &:focus {
      opacity: 0.5;
    }
    &:hover {
      opacity: 0.74;
    }
  `,
  iconButtonStop: css`
    width: ${theme.typography.pxToRem(12)};
    height: ${theme.typography.pxToRem(12)};
    padding: 0;
    border-radius: none;
    transition: ${theme.transitions.create('opacity')};

    &:focus {
      opacity: 0.5;
    }
    &:hover {
      opacity: 0.74;
    }
  `,
  icon: css`
    width: 100%;
    height: 100%;
  `,
});

export { createStyles };
