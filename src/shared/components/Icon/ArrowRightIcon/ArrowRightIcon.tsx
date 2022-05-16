import { FC } from 'react';
import { SvgIconProps as MUIArrowRightAltIconProps } from '@mui/material';
import MUIArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

type Props = MUIArrowRightAltIconProps;

const ArrowRightIcon: FC<Props> = ({ css, ...MUIProps }) => {
  return <MUIArrowRightAltIcon css={css} {...MUIProps} />;
};

export type { Props };

export { ArrowRightIcon };
