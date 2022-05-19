import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './InputAdornment';

const createStyles = (props: Pick<Props, 'orientation'>, theme: Theme) => ({
  root: () => {
    const orientation =
      props.orientation === 'vertical' &&
      css`
        flex-direction: column;
        height: initial;
        max-height: 100%;
        padding: ${theme.spacing(4, 0)};
      `;

    return css`
      ${orientation}
    `;
  },
});

export { createStyles };
