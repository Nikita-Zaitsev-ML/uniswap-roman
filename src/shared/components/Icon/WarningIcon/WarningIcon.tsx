import { FC } from 'react';
import { SvgIconProps as MUIWarningIconProps } from '@mui/material';
import { Warning as MUIWarningIcon } from '@mui/icons-material';

type Props = MUIWarningIconProps & {};

const WarningIcon: FC<Props> = ({ ...MUIProps }) => {
  return <MUIWarningIcon {...MUIProps} />;
};

export type { Props };

export { WarningIcon };
