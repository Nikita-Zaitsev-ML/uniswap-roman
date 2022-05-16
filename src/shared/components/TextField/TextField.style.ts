import { css, alpha } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './TextField';

const createStyles = (
  props: Pick<Props, 'size' | 'multiline'>,
  theme: Theme
) => ({
  root: () => css`
    & .MuiInputLabel-shrink {
      letter-spacing: ${theme.typography.caption.letterSpacing};
      color: ${alpha(theme.palette.common.black, 1)};
      transform: translate(17px, -9px) scale(0.75);
    }

    & .MuiInputBase-root {
      ${props.multiline &&
      css`
        padding: ${theme.spacing(17, 16, 2, 17)};
      `}

      line-height: ${theme.typography.subtitle1.lineHeight};
    }

    & .MuiInputBase-input {
      border-radius: 0%;

      &::placeholder {
        color: ${theme.palette.grey[700]};
        opacity: 1;
      }

      ${props.size === 'less-medium' &&
      !props.multiline &&
      css`
        height: ${theme.spacing(19)};
        padding: ${theme.spacing(16, 16, 17, 18)};
      `}
    }

    & .MuiOutlinedInput-notchedOutline {
      border-color: ${alpha(theme.palette.grey[900], 0.38)};
      border-radius: 0%;
    }
  `,
});

export { createStyles };
