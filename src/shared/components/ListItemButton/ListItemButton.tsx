import { FC } from 'react';
import {
  ListItemButtonProps as MUIListItemButtonProps,
  ListItemButton as MUIListItemButton,
} from '@mui/material';

type Props = MUIListItemButtonProps & {};

const ListItemButton: FC<Props> = ({ ...MUIProps }) => {
  return <MUIListItemButton {...MUIProps} />;
};

export type { Props };

export { ListItemButton };
