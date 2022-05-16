import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './Container';

const createStyles = (props: Pick<Props, 'maxWidth'>, theme: Theme) => {
  return {
    root: () => {
      const { maxWidth } = props;
      const { spacing } = theme;
      const maxWidthIsBreakpoint =
        maxWidth === 'xs' ||
        maxWidth === 'sm' ||
        maxWidth === 'md' ||
        maxWidth === 'lg' ||
        maxWidth === 'xl';

      let maxWidthCSS;

      if (maxWidthIsBreakpoint) {
        maxWidthCSS = css`
          max-width: ${theme.breakpoints.values[maxWidth]};
        `;
      } else if (typeof maxWidth === 'number') {
        maxWidthCSS = css`
          max-width: ${spacing(maxWidth)};
        `;
      }

      return css`
        ${maxWidthCSS}
      `;
    },
  };
};

export { createStyles };
