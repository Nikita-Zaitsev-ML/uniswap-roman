import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './TextField';

const createStyles = (
  props: Pick<Props, 'size' | 'multiline'>,
  theme: Theme
) => ({
  root: () => css`
    & .MuiInputBase-root {
      ${props.multiline &&
      css`
        padding: ${theme.spacing(17, 16, 2, 17)};
      `}
    }

    & .MuiInputBase-input {
      ${props.size === 'less-medium' &&
      !props.multiline &&
      css`
        height: ${theme.spacing(19)};
        padding: ${theme.spacing(16, 16, 17, 18)};
      `}
    }
  `,
});

export { createStyles };
