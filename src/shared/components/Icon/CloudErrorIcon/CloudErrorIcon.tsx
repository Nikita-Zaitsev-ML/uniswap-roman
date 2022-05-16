import { FC } from 'react';
import { SvgIconProps as MUICloudErrorIconProps } from '@mui/material';
import MUICloudErrorIcon from '@mui/icons-material/CloudOff';

type Props = MUICloudErrorIconProps;

const CloudErrorIcon: FC<Props> = ({ css, ...MUIProps }) => {
  return <MUICloudErrorIcon css={css} {...MUIProps} />;
};

export type { Props };

export { CloudErrorIcon };
