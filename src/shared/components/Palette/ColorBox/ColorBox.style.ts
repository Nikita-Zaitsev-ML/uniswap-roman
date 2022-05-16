import { css, alpha } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './ColorBox';

const createStyles = (
  props: Required<
    Pick<Props, 'checked' | 'size' | 'color' | 'backgroundColor'>
  >,
  theme: Theme
) => ({
  root: () => {
    const checked =
      props.checked &&
      css`
        background: ${alpha(props.backgroundColor, 0.6)};
      `;
    let size;

    switch (props.size) {
      case 'medium': {
        size = css`
          width: ${theme.spacing(40)};
          height: ${theme.spacing(40)};
        `;

        break;
      }

      // no default
    }

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${alpha(props.color, 1)};
      background-color: ${alpha(props.backgroundColor, 1)};
      border-radius: 3px;
      cursor: pointer;

      ${checked}
      ${size}

      &:hover {
        background: ${alpha(props.backgroundColor, 0.4)};
      }

      &:focus-visible {
        outline-style: auto;
        outline-width: 1px;
      }
    `;
  },
});

export { createStyles };
