import { FC } from 'react';
import { SvgIconProps as ExpandMoreIconProps } from '@mui/material';
import MUIExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = ExpandMoreIconProps & {};

const ExpandMore: FC<Props> = ({ ...MUIProps }) => {
  return <MUIExpandMoreIcon {...MUIProps} />;
};

export type { Props };

export { ExpandMore };
