import { css } from '@mui/material';

const createStyles = () => ({
  root: () => css`
    height: 100%;
    min-height: 100%;
    margin: 0 auto;
  `,
  grid: () => css`
    display: grid;
    min-height: 100%;
    height: 100%;
  `,
});

export { createStyles };
