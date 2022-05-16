import { FC } from 'react';
import {
  PopperProps as MUIPopperProps,
  Popper as MUIPopper,
} from '@mui/material';

type Props = MUIPopperProps & {};

const Popper: FC<Props> = ({ ...MUIProps }) => {
  return <MUIPopper {...MUIProps} />;
};

export type { Props };

export { Popper };
