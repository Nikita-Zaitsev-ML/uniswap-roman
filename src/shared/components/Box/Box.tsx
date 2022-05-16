import { forwardRef, PropsWithChildren } from 'react';
import { BoxProps as MUIBoxProps, Box as MUIBox } from '@mui/material';

type Props = MUIBoxProps & {};

const Box = forwardRef<unknown, PropsWithChildren<Props>>((props, ref) => {
  const { ...MUIProps } = props;

  return <MUIBox {...MUIProps} ref={ref} />;
});

Box.displayName = 'Box';

export type { Props };

export { Box };
