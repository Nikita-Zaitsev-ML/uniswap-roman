import { FC } from 'react';
import { SvgIconProps as PlayCircleIconProps } from '@mui/material';
import MUIPlayCircleIcon from '@mui/icons-material/PlayCircle';

type Props = PlayCircleIconProps & {};

const PlayCircle: FC<Props> = ({ ...MUIProps }) => {
  return <MUIPlayCircleIcon {...MUIProps} />;
};

export type { Props };

export { PlayCircle };
