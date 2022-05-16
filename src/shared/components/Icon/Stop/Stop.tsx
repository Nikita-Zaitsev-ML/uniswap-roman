import { FC } from 'react';
import { SvgIconProps as MUIStopIconProps } from '@mui/material';
import MUIStopIcon from '@mui/icons-material/Stop';

type Props = MUIStopIconProps & {};

const Stop: FC<Props> = ({ ...MUIProps }) => {
  return <MUIStopIcon {...MUIProps} />;
};

export type { Props };

export { Stop };
