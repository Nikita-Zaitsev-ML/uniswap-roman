import { FC } from 'react';
import { SvgIconProps as MUICheckProps } from '@mui/material';
import MUICheckIcon from '@mui/icons-material/Check';

type Props = MUICheckProps & {};

const Check: FC<Props> = ({ ...MUIProps }) => {
  return <MUICheckIcon {...MUIProps} />;
};

export type { Props };

export { Check };
