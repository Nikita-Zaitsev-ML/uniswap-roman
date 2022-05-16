import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './DefaultLayout';

const createStyles = (props: Pick<Props, 'withHeader'>, theme: Theme) => ({
  root: () => {
    const layout = css`
      grid:
        ${props.withHeader && "'header' auto"}
        'content' 1fr / auto;
    `;

    return css`
      display: grid;
      min-height: 100%;
      overflow: hidden;

      ${layout}
    `;
  },
  header: () => {
    const mobileHeight = 123;

    return css`
      grid-area: header;
      margin-top: max(${mobileHeight}px, ${theme.spacing(150)});
    `;
  },
  content: () => {
    const grid = css`
      grid: auto / auto;
    `;

    return css`
      grid-area: content;
      display: grid;
      padding-bottom: 1em;

      ${grid}
    `;
  },
  heading: () => css`
    grid-area: heading;
  `,
  main: () => css``,
});

export { createStyles };
