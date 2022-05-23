import { FC } from 'react';
import { SvgIconProps as MUIAddProps } from '@mui/material';
import MUIAddIcon from '@mui/icons-material/Add';

type Props = MUIAddProps & {};

const Add: FC<Props> = ({ ...MUIProps }) => {
  return <MUIAddIcon {...MUIProps} />;
};

export type { Props };

export { Add };
