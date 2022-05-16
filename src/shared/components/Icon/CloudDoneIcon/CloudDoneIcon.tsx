import { FC } from 'react';
import { SvgIconProps as MUICloudDoneIconProps } from '@mui/material';
import MUICloudDoneIcon from '@mui/icons-material/CloudDone';

type Props = MUICloudDoneIconProps;

const CloudDoneIcon: FC<Props> = ({ css, ...MUIProps }) => {
  return <MUICloudDoneIcon css={css} {...MUIProps} />;
};

export type { Props };

export { CloudDoneIcon };
