import { forwardRef, PropsWithChildren } from 'react';
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';

type Props = MUIButtonProps & {};

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  ({ ...MUIProps }, ref) => {
    return <MUIButton {...MUIProps} ref={ref} />;
  }
);

Button.displayName = 'Button';

export type { Props };

export { Button };
