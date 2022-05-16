import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './LinearProgress';

const createStyles = (props: Pick<Props, 'position'>, theme: Theme) => ({
  root: () => {
    let position;

    switch (props.position) {
      case 'fixed-top': {
        position = css`
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: ${theme.zIndex.tooltip};
        `;

        break;
      }
      default: {
        break;
      }
    }

    return css`
      ${position}
    `;
  },
});

export { createStyles };
