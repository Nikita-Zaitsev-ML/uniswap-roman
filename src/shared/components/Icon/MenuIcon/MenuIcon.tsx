import { FC } from 'react';
import { SvgIconProps as MUIMenuIconProps } from '@mui/material';
import MUIMenuIcon from '@mui/icons-material/Menu';

type Props = MUIMenuIconProps & {};

const MenuIcon: FC<Props> = ({ ...MUIProps }) => {
  return <MUIMenuIcon {...MUIProps} />;
};

export type { Props };

export { MenuIcon };
