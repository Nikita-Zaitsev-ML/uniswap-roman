import { forwardRef, ElementType, PropsWithChildren } from 'react';
import { BoxProps as MUIBoxProps, Box as MUIBox } from '@mui/material';

type Props<D extends ElementType<any>> = MUIBoxProps<D> & {};

const Box = forwardRef<unknown, PropsWithChildren<Props<ElementType<any>>>>(
  (props, ref) => {
    const { ...MUIProps } = props;

    return <MUIBox {...MUIProps} ref={ref} />;
  }
);

Box.displayName = 'Box';

export type { Props };

export { Box };
