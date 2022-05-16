import { FC } from 'react';
import {
  PopoverProps as MUIPopoverProps,
  Popover as MUIPopover,
} from '@mui/material';

type Props = MUIPopoverProps & {};

const Popover: FC<Props> = ({ ...MUIProps }) => {
  return <MUIPopover {...MUIProps} />;
};

export type { Props };

export { Popover };
