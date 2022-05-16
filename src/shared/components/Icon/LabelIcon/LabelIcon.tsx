import { FC } from 'react';
import { SvgIconProps as MUILabelIconProps } from '@mui/material';
import MUILabelIcon from '@mui/icons-material/Label';

type Props = MUILabelIconProps;

const LabelIcon: FC<Props> = ({ ...MUIProps }) => {
  return <MUILabelIcon {...MUIProps} />;
};

export type { Props };

export { LabelIcon };
