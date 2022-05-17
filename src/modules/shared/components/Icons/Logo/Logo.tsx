import { FC } from 'react';

import {
  SVGIcon,
  Props as SVGIconProps,
} from 'src/shared/components/Icon/SVGIcon/SVGIcon';

import SVG from './logo.svg';

type Props = Omit<SVGIconProps, 'component'> & {};

const Logo: FC<Props> = (props) => {
  return <SVGIcon component={SVG} {...props}></SVGIcon>;
};

export type { Props };

export { Logo };
