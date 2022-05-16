import { FC } from 'react';
import {
  IconButtonProps as MUIIconButtonProps,
  IconButton as MUIIconButton,
} from '@mui/material';

type Props = MUIIconButtonProps & {};

const IconButton: FC<Props> = ({ ...MUIProps }) => {
  return <MUIIconButton {...MUIProps} />;
};

export type { Props };

export { IconButton };
