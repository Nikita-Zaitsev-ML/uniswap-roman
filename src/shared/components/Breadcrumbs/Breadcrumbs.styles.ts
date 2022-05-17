import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './Breadcrumbs';

const createStyles = (props: Pick<Props, 'variant'>, theme: Theme) => ({
  root: () => {
    let variant;

    switch (props.variant) {
      case 'rounded': {
        variant = css`
          padding: ${theme.spacing(2)};
          border-radius: ${theme.spacing(16)};

          & .MuiBreadcrumbs-li {
            display: flex;
          }
        `;

        break;
      }

      // no default
    }

    return css`
      background: ${theme.palette.background.paper};

      ${variant}
    `;
  },
  item: (itemProps: { isActive?: boolean }) => {
    const isActive = itemProps.isActive
      ? css`
          color: ${theme.palette.primary.contrastText};
          background: ${theme.palette.grey[900]};
        `
      : css`
          color: ${theme.palette.grey[500]};
        `;
    let variant;

    switch (props.variant) {
      case 'rounded': {
        variant = css`
          padding: ${theme.spacing(8, 12)};
          border-radius: ${theme.spacing(48)};
        `;

        break;
      }

      // no default
    }

    return css`
      font-size: ${theme.typography.button.fontSize};
      font-weight: ${theme.typography.button.fontWeight};
      word-break: break-word;
      overflow: hidden;
      white-space: nowrap;

      ${variant}
      ${isActive}
    `;
  },
});

export { createStyles };
