import { FC } from 'react';
import {
  SvgIconProps as MUISvgIconProps,
  SvgIcon as MUISvgIcon,
} from '@mui/material';

type Props = MUISvgIconProps & { component: FC };

const SVGIcon: FC<Props> = ({ component, ...MUIProps }) => {
  return <MUISvgIcon component={component} {...MUIProps} />;
};

export type { Props };

export { SVGIcon };
