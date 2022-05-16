import { css, alpha } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './Link';

const createStyles = (props: Pick<Props, 'underline'>, theme: Theme) => ({
  root: () => {
    const underline =
      props.underline === 'hover' &&
      css`
        text-decoration-line: none;

        &:hover {
          text-decoration-line: underline;
          text-decoration-thickness: 2px;
          text-underline-offset: 2px;
          text-decoration-color: ${alpha(theme.palette.primary.main, 0.8)};
        }
      `;

    return css`
      ${underline}
    `;
  },
});

export { createStyles };
