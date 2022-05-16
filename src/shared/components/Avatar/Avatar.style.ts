import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './Avatar';

const createStyles = (props: Pick<Props, 'hasBorder'>, theme: Theme) => ({
  root: () => css`
    width: 100%;
  `,

  inner: () => css`
    position: relative;
    height: 0;
    border: none;
    padding-top: 100%;
  `,

  avatar: () => {
    const border = props.hasBorder
      ? css`
          border: ${theme.spacing(3)} solid ${theme.palette.grey[900]};
        `
      : css`
          border: none;
        `;

    const avatar = css`
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      color: black;

      ${border}
    `;

    return avatar;
  },
});

export { createStyles };
