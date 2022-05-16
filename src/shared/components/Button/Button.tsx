import { forwardRef, PropsWithChildren } from 'react';
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  useTheme,
} from '@mui/material';

import { createStyles } from './Button.style';

type Props = Omit<MUIButtonProps, 'size'> & {
  size?: MUIButtonProps['size'] | 'extra-large';
  borderRadius?: 'rounded';
  shadow?: boolean;
  target?: string;
  rel?: string;
  noWrap?: boolean;
};

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (props, ref) => {
    const {
      size: customSize,
      borderRadius,
      shadow = false,
      noWrap = false,
      ...MUIProps
    } = props;
    const theme = useTheme();
    const styles = createStyles(
      { size: customSize, borderRadius, shadow, noWrap },
      theme
    );

    const size = customSize === 'extra-large' ? undefined : customSize;

    return (
      <MUIButton css={styles.root()} size={size} {...MUIProps} ref={ref} />
    );
  }
);

Button.displayName = 'Button';

export type { Props };

export { Button };
