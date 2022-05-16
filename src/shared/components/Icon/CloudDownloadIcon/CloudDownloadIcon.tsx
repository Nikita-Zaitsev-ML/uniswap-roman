import { FC } from 'react';
import { SvgIconProps as MUICloudDownloadIconProps } from '@mui/material';
import MUICloudDownloadIcon from '@mui/icons-material/CloudDownload';

type Props = MUICloudDownloadIconProps;

const CloudDownloadIcon: FC<Props> = ({ css, ...MUIProps }) => {
  return <MUICloudDownloadIcon css={css} {...MUIProps} />;
};

export type { Props };

export { CloudDownloadIcon };
