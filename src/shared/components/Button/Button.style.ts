import { css, alpha } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';
import { ellipsis } from 'src/shared/helpers/materialUI/text';

import type { Props } from './Button';

const createStyles = (
  props: Pick<Props, 'size' | 'borderRadius' | 'shadow' | 'noWrap'>,
  theme: Theme
) => ({
  root: () => {
    const shadow =
      props.shadow &&
      css`
        filter: drop-shadow(0 0 2px ${alpha(theme.palette.common.black, 0.14)})
          drop-shadow(0 2px 2px ${alpha(theme.palette.common.black, 0.12)});
      `;

    const noWrap =
      props.noWrap &&
      css`
        ${ellipsis}
      `;

    let size;

    if (props.size === 'extra-large') {
      size = css`
        font-size: ${theme.typography.button.fontSize};
        padding: ${theme.spacing(10, 16)};
      `;
    }

    return css`
      text-align: center;
      border-radius: ${props.borderRadius === 'rounded' && theme.spacing(200)};

      ${size}
      ${shadow}
      ${noWrap}

      &.Mui-disabled {
        color: ${theme.palette.common.white};
        background-color: ${theme.palette.grey.A400};
      }
    `;
  },
});

export { createStyles };
